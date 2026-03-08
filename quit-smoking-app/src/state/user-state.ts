import type { BenefitType, SmokingType } from "@/src/domain/enums";
import type { CravingLog, JournalEntry, RelapseLog } from "@/src/domain/logs";
import type { MilestoneState } from "@/src/domain/milestones";
import type { NotificationSettings } from "@/src/domain/notification-settings";
import type { PremiumState } from "@/src/domain/premium";
import type { RecoveryModeState } from "@/src/domain/recovery-mode";

export interface UserState {
  version: number;
  onboardingCompleted: boolean;
  quitStartDate: string;
  identityStartDate: string;
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
  milestones: MilestoneState;
}
