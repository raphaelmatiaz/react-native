import {
  canAccessAdvancedRelapseAnalysis,
  canAccessExtendedRecoveryMode,
  canAccessThemeCustomization,
  canAccessTriggerHeatmap,
  hasPremiumExpired,
  isPremiumActive,
  shouldShowEthicalUpsell,
} from "@/src/selectors/premium-selectors";
import { createInitialUserState } from "@/src/state/initial-user-state";

describe("premium selectors", () => {
  it("treats lifetime as always active", () => {
    const state = createInitialUserState();
    state.premium = { isPremium: true, lifetime: true };

    expect(isPremiumActive(state)).toBe(true);
    expect(canAccessTriggerHeatmap(state)).toBe(true);
    expect(canAccessAdvancedRelapseAnalysis(state)).toBe(true);
    expect(canAccessThemeCustomization(state)).toBe(true);
    expect(canAccessExtendedRecoveryMode(state)).toBe(true);
  });

  it("detects expired yearly premium", () => {
    const state = createInitialUserState();
    state.premium = {
      isPremium: true,
      lifetime: false,
      purchaseDate: "2025-01-01T00:00:00.000Z",
      expiryDate: "2025-12-31T23:59:59.000Z",
    };

    expect(isPremiumActive(state, new Date("2026-03-08T00:00:00.000Z"))).toBe(false);
    expect(hasPremiumExpired(state, new Date("2026-03-08T00:00:00.000Z"))).toBe(true);
  });

  it("shows ethical upsell only at allowed milestones and not in crisis", () => {
    const state = createInitialUserState();
    state.quitStartDate = "2026-03-01T00:00:00.000Z";
    state.cravingLogs = Array.from({ length: 20 }, (_, i) => ({
      id: `c${i}`,
      timestamp: "2026-03-07T12:00:00.000Z",
      trigger: "stress",
      intensityStart: 8,
      intensityEnd: 3,
      resisted: true,
    }));

    expect(shouldShowEthicalUpsell(state, "home")).toBe(true);
    expect(shouldShowEthicalUpsell(state, "craving")).toBe(false);

    state.recoveryMode = { active: true, expiresAt: "2026-03-10T00:00:00.000Z" };
    expect(shouldShowEthicalUpsell(state, "progress")).toBe(false);
  });
});
