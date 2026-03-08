import {
  calculateCurrentStreak,
  calculateLongestStreak,
  calculateSmokeFreePercentage,
  calculateCigarettesAvoided,
  calculateMoneySaved,
  isRecoveryModeActive,
} from "@/src/selectors/progress-selectors";
import { createInitialUserState } from "@/src/state/initial-user-state";

describe("progress selectors", () => {
  it("returns current streak from last relapse break", () => {
    const state = createInitialUserState();
    const now = new Date("2026-03-08T12:00:00.000Z");

    state.quitStartDate = "2026-03-01T10:00:00.000Z";
    state.relapseLogs = [
      { id: "r1", timestamp: "2026-03-05T11:00:00.000Z", trigger: "stress" },
    ];

    expect(calculateCurrentStreak(state, now)).toBe(3);
    expect(calculateLongestStreak(state, now)).toBe(4);
  });

  it("returns zero current streak when relapse happened today", () => {
    const state = createInitialUserState();
    const now = new Date("2026-03-08T22:00:00.000Z");

    state.quitStartDate = "2026-03-01T10:00:00.000Z";
    state.relapseLogs = [
      { id: "r1", timestamp: "2026-03-08T01:00:00.000Z", trigger: "stress" },
    ];

    expect(calculateCurrentStreak(state, now)).toBe(0);
  });

  it("calculates smoke-free percentage and savings safely", () => {
    const state = createInitialUserState();
    const now = new Date("2026-03-08T12:00:00.000Z");

    state.quitStartDate = "2026-03-01T10:00:00.000Z";
    state.cigarettesPerDay = 10;
    state.packPrice = 12;
    state.relapseLogs = [
      { id: "r1", timestamp: "2026-03-03T11:00:00.000Z", trigger: "stress" },
      { id: "r2", timestamp: "2026-03-07T11:00:00.000Z", trigger: "coffee" },
    ];

    expect(Math.round(calculateSmokeFreePercentage(state, 30, now))).toBe(75);
    expect(calculateCigarettesAvoided(state, now)).toBe(60);
    expect(calculateMoneySaved(state, now)).toBeCloseTo(3.6, 2);
  });

  it("handles recovery active status based on expiry", () => {
    const state = createInitialUserState();

    state.recoveryMode = {
      active: true,
      activatedAt: "2026-03-07T10:00:00.000Z",
      expiresAt: "2026-03-09T10:00:00.000Z",
    };

    expect(isRecoveryModeActive(state, new Date("2026-03-08T12:00:00.000Z"))).toBe(true);
    expect(isRecoveryModeActive(state, new Date("2026-03-10T12:00:00.000Z"))).toBe(false);
  });
});
