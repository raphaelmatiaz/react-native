import { STATE_SCHEMA_VERSION } from "@/src/constants/app";
import type { UserState } from "@/src/state/user-state";

export const createInitialUserState = (): UserState => {
  const now = new Date().toISOString();

  return {
    version: STATE_SCHEMA_VERSION,
    onboardingCompleted: false,
    quitStartDate: now,
    identityStartDate: now,
    userType: "triedBefore",
    benefits: [],
    cigarettesPerDay: 10,
    packPrice: 10,
    personalReasons: [],
    cravingLogs: [],
    relapseLogs: [],
    journalEntries: [],
    premium: {
      isPremium: false,
      lifetime: false,
    },
    notificationSettings: {
      morningTime: "08:00",
      eveningTime: "18:00",
      milestoneEnabled: true,
    },
    recoveryMode: {
      active: false,
    },
  };
};
