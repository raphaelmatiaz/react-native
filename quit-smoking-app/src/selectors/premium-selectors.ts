import type { UserState } from "@/src/state/user-state";

export type UpsellContext = "home" | "profile" | "progress" | "craving" | "relapse";

const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export const isPremiumActive = (state: UserState, now = new Date()): boolean => {
  if (state.premium.lifetime) {
    return true;
  }

  if (!state.premium.isPremium) {
    return false;
  }

  if (!state.premium.expiryDate) {
    return true;
  }

  return new Date(state.premium.expiryDate).getTime() > now.getTime();
};

export const hasPremiumExpired = (state: UserState, now = new Date()): boolean => {
  if (state.premium.lifetime || !state.premium.isPremium || !state.premium.expiryDate) {
    return false;
  }

  return new Date(state.premium.expiryDate).getTime() <= now.getTime();
};

export const getYearlyExpiryFromPurchase = (purchaseDateIso: string): string => {
  return new Date(new Date(purchaseDateIso).getTime() + YEAR_MS).toISOString();
};

export const canAccessTriggerHeatmap = (state: UserState): boolean => isPremiumActive(state);

export const canAccessAdvancedRelapseAnalysis = (state: UserState): boolean =>
  isPremiumActive(state);

export const canAccessThemeCustomization = (state: UserState): boolean => isPremiumActive(state);

export const canAccessExtendedRecoveryMode = (state: UserState): boolean => isPremiumActive(state);

export const shouldShowEthicalUpsell = (
  state: UserState,
  context: UpsellContext,
): boolean => {
  if (isPremiumActive(state)) {
    return false;
  }

  // Never upsell during craving or relapse crisis contexts.
  if (context === "craving" || context === "relapse") {
    return false;
  }

  if (state.recoveryMode.active) {
    return false;
  }

  const resistedCravings = state.cravingLogs.filter((log) => log.resisted).length;
  const streakDays = Math.max(0, Math.floor((Date.now() - new Date(state.quitStartDate).getTime()) / (24 * 60 * 60 * 1000)) + 1);

  return streakDays >= 7 || streakDays >= 30 || resistedCravings >= 20;
};
