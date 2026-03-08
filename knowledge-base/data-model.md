# StreakQuit – Data Model Specification

All data is stored locally using AsyncStorage.

Storage Key:
@streakquit_user

Data must be versioned for future migrations.

---

# 1. Root State Interface

```ts
export interface UserState {
  version: number;

  onboardingCompleted: boolean;

  quitStartDate: string; // ISO string
  identityStartDate: string; // ISO string

  userType: SmokingType;
  benefits: BenefitType[];

  cigarettesPerDay: number;
  packPrice: number;

  personalReasons: string[];

  cravingLogs: CravingLog[];
  relapseLogs: RelapseLog[];
  journalEntries: JournalEntry[];

  premium: PremiumState;

  notificationSettings: NotificationSettings;

  recoveryMode: RecoveryModeState;
}