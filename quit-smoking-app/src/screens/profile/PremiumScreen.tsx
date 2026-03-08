import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useUser } from "@/src/state";
import { ScreenContainer, Card, SectionHeader, Divider } from "@/src/components/layout";
import { PrimaryButton, SecondaryButton } from "@/src/components/core";
import { spacing, radii, colors } from "@/src/theme";
import {
  loadPremiumProductsAsync,
  purchasePremiumPlanAsync,
  restorePremiumPurchasesAsync,
  type PremiumPlan,
  type PremiumProduct,
} from "@/src/services/premium";
import { isPremiumActive } from "@/src/selectors";

const PREMIUM_FEATURES = [
  { icon: "📊", title: "Trigger Heatmap" },
  { icon: "🔍", title: "Advanced Analytics" },
  { icon: "🎨", title: "Theme Customization" },
];

export const PremiumScreen = () => {
  const { state, dispatch } = useUser();
  const [products, setProducts] = useState<PremiumProduct[]>([]);
  const [busyPlan, setBusyPlan] = useState<PremiumPlan | "restore" | null>(null);

  const premiumEnabled = isPremiumActive(state);

  useEffect(() => {
    const load = async () => {
      const result = await loadPremiumProductsAsync();
      setProducts(result);
    };

    void load();
  }, []);

  const applyPremiumPurchase = (
    purchaseDate?: string,
    expiryDate?: string,
    lifetime?: boolean,
  ) => {
    dispatch({
      type: "TOGGLE_PREMIUM",
      payload: {
        isPremium: true,
        purchaseDate,
        expiryDate,
        lifetime: Boolean(lifetime),
      },
    });
  };

  const handlePurchase = async (plan: PremiumPlan) => {
    setBusyPlan(plan);
    const result = await purchasePremiumPlanAsync(plan);

    if (result.success) {
      applyPremiumPurchase(result.purchaseDate, result.expiryDate, result.lifetime);
      Alert.alert("Premium Activated", result.message ?? "Your premium access is now active.");
    } else {
      Alert.alert("Purchase not completed", result.message ?? "Please try again.");
    }

    setBusyPlan(null);
  };

  const handleRestore = async () => {
    setBusyPlan("restore");
    const result = await restorePremiumPurchasesAsync();

    if (result.success) {
      applyPremiumPurchase(result.purchaseDate, result.expiryDate, result.lifetime);
      Alert.alert("Purchases Restored", result.message ?? "Premium has been restored.");
    } else {
      Alert.alert("Restore complete", result.message ?? "No eligible purchases found.");
    }

    setBusyPlan(null);
  };

  if (premiumEnabled) {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Card>
            <Text style={styles.statusTitle}>✓ Premium Active</Text>
            <Text style={styles.statusText}>You have access to all premium features.</Text>
          </Card>

          <SectionHeader title="Premium Features" />
          {PREMIUM_FEATURES.map((feature, idx) => (
            <Card key={idx}>
              <View style={styles.featureRow}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </View>
            </Card>
          ))}

          <Divider />
          <SecondaryButton
            label="Restore Purchases"
            onPress={handleRestore}
          />
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SectionHeader title="Unlock Premium" subtitle="Advanced tools to master your quit journey" />

        {PREMIUM_FEATURES.map((feature, idx) => (
          <Card key={idx}>
            <View style={styles.featureRow}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text style={styles.featureTitle}>{feature.title}</Text>
            </View>
          </Card>
        ))}

        <Divider />
        <SectionHeader title="Choose Your Plan" />

        {products.map((plan) => (
          <Card key={plan.productId}>
            <View style={styles.planRow}>
              <View>
                <Text style={styles.planLabel}>{plan.title}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
              </View>
              <PrimaryButton
                label={busyPlan === plan.productId ? "Processing..." : "Get"}
                onPress={() => handlePurchase(plan.productId)}
              />
            </View>
          </Card>
        ))}

        <SecondaryButton
          label={busyPlan === "restore" ? "Restoring..." : "Restore Purchases"}
          onPress={handleRestore}
        />

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>Prices are subject to change. Your subscription renews automatically.</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  statusText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  featureRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  featureIcon: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  planRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  planPrice: {
    fontSize: 13,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  disclaimer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: `${colors.text}05`,
    borderRadius: radii.md,
    marginTop: spacing.lg,
  },
  disclaimerText: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
});
