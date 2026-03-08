import { Platform } from "react-native";
import * as InAppPurchases from "expo-in-app-purchases";

import { getYearlyExpiryFromPurchase } from "@/src/selectors";

export type PremiumPlan = "yearly_subscription" | "lifetime_unlock";

export interface PremiumProduct {
  productId: PremiumPlan;
  title: string;
  description: string;
  price: string;
}

export interface PremiumPurchaseResult {
  success: boolean;
  plan?: PremiumPlan;
  purchaseDate?: string;
  expiryDate?: string;
  lifetime?: boolean;
  message?: string;
}

const PREMIUM_PRODUCT_IDS: PremiumPlan[] = ["yearly_subscription", "lifetime_unlock"];

const FALLBACK_PRODUCTS: PremiumProduct[] = [
  {
    productId: "yearly_subscription",
    title: "Yearly",
    description: "Full premium access for 1 year",
    price: "$9.99",
  },
  {
    productId: "lifetime_unlock",
    title: "Lifetime",
    description: "One-time unlock for life",
    price: "$29.99",
  },
];

let connected = false;

const ensureConnectionAsync = async (): Promise<void> => {
  if (connected) {
    return;
  }

  await InAppPurchases.connectAsync();
  connected = true;
};

const mapStoreProducts = (
  results?: InAppPurchases.IAPItemDetails[],
): PremiumProduct[] => {
  if (!results || results.length === 0) {
    return FALLBACK_PRODUCTS;
  }

  return results
    .filter((item) => PREMIUM_PRODUCT_IDS.includes(item.productId as PremiumPlan))
    .map((item) => ({
      productId: item.productId as PremiumPlan,
      title: item.title,
      description: item.description,
      price: item.price,
    }));
};

export const getPremiumProductIds = (): PremiumPlan[] => PREMIUM_PRODUCT_IDS;

export const loadPremiumProductsAsync = async (): Promise<PremiumProduct[]> => {
  if (Platform.OS === "web") {
    return FALLBACK_PRODUCTS;
  }

  try {
    await ensureConnectionAsync();
    const response = await InAppPurchases.getProductsAsync(PREMIUM_PRODUCT_IDS);
    return mapStoreProducts(response.results);
  } catch (error) {
    console.error("Failed to load IAP products", error);
    return FALLBACK_PRODUCTS;
  }
};

const toResultFromProduct = (
  productId: string,
  purchaseTimeMs?: number,
): PremiumPurchaseResult => {
  const purchaseDate = new Date(purchaseTimeMs ?? Date.now()).toISOString();

  if (productId === "lifetime_unlock") {
    return {
      success: true,
      plan: "lifetime_unlock",
      purchaseDate,
      lifetime: true,
      message: "Lifetime premium unlocked.",
    };
  }

  return {
    success: true,
    plan: "yearly_subscription",
    purchaseDate,
    expiryDate: getYearlyExpiryFromPurchase(purchaseDate),
    lifetime: false,
    message: "Yearly premium activated.",
  };
};

export const purchasePremiumPlanAsync = async (
  plan: PremiumPlan,
): Promise<PremiumPurchaseResult> => {
  if (Platform.OS === "web") {
    return {
      success: false,
      message: "In-app purchases are unavailable on web builds.",
    };
  }

  try {
    await ensureConnectionAsync();
    await InAppPurchases.getProductsAsync(PREMIUM_PRODUCT_IDS);

    return await new Promise<PremiumPurchaseResult>((resolve) => {
      let settled = false;

      const finish = (result: PremiumPurchaseResult) => {
        if (settled) {
          return;
        }

        settled = true;
        resolve(result);
      };

      InAppPurchases.setPurchaseListener(async ({ responseCode, results, errorCode }) => {
        if (responseCode === InAppPurchases.IAPResponseCode.OK && results?.length) {
          const match = results.find((purchase) => purchase.productId === plan);

          if (!match) {
            return;
          }

          try {
            await InAppPurchases.finishTransactionAsync(match, false);
          } catch (error) {
            console.error("Failed to finalize premium transaction", error);
          }

          finish(toResultFromProduct(match.productId, match.purchaseTime));
          return;
        }

        if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
          finish({ success: false, message: "Purchase canceled." });
          return;
        }

        if (responseCode === InAppPurchases.IAPResponseCode.ERROR) {
          finish({ success: false, message: `Purchase failed (${String(errorCode)}).` });
        }
      });

      void InAppPurchases.purchaseItemAsync(plan).catch((error) => {
        finish({ success: false, message: `Purchase request failed: ${String(error)}` });
      });

      setTimeout(() => {
        finish({ success: false, message: "Purchase timed out. Please try again." });
      }, 20000);
    });
  } catch (error) {
    return {
      success: false,
      message: `Unable to start purchase: ${String(error)}`,
    };
  }
};

export const restorePremiumPurchasesAsync = async (): Promise<PremiumPurchaseResult> => {
  if (Platform.OS === "web") {
    return {
      success: false,
      message: "Restore is unavailable on web builds.",
    };
  }

  try {
    await ensureConnectionAsync();
    const history = await InAppPurchases.getPurchaseHistoryAsync({ useGooglePlayCache: false });
    const purchases = history.results ?? [];

    const lifetime = purchases
      .filter((purchase) => purchase.productId === "lifetime_unlock")
      .sort((a, b) => b.purchaseTime - a.purchaseTime)[0];

    if (lifetime) {
      return toResultFromProduct("lifetime_unlock", lifetime.purchaseTime);
    }

    const yearly = purchases
      .filter((purchase) => purchase.productId === "yearly_subscription")
      .sort((a, b) => b.purchaseTime - a.purchaseTime)[0];

    if (yearly) {
      return toResultFromProduct("yearly_subscription", yearly.purchaseTime);
    }

    return {
      success: false,
      message: "No previous premium purchases were found.",
    };
  } catch (error) {
    return {
      success: false,
      message: `Restore failed: ${String(error)}`,
    };
  }
};
