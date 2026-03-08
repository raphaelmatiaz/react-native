import type {
  CravingLog,
  JournalEntry,
  NotificationSettings,
  RelapseLog,
} from "@/src/domain";
import type { UserState } from "@/src/state/user-state";

export type UserAction =
  | {
      type: "HYDRATE_STATE";
      payload: UserState;
    }
  | {
      type: "COMPLETE_ONBOARDING";
      payload: {
        quitStartDate: string;
        identityStartDate: string;
      };
    }
  | {
      type: "UPDATE_ONBOARDING_FIELDS";
      payload: {
        userType?: UserState["userType"];
        benefits?: UserState["benefits"];
        cigarettesPerDay?: number;
        packPrice?: number;
        personalReasons?: string[];
        quitStartDate?: string;
        identityStartDate?: string;
      };
    }
  | {
      type: "ADD_CRAVING_LOG";
      payload: CravingLog;
    }
  | {
      type: "ADD_RELAPSE_LOG";
      payload: RelapseLog;
    }
  | {
      type: "ADD_JOURNAL_ENTRY";
      payload: JournalEntry;
    }
  | {
      type: "UPDATE_REASONS";
      payload: string[];
    }
  | {
      type: "TOGGLE_PREMIUM";
      payload: {
        isPremium: boolean;
        purchaseDate?: string;
        expiryDate?: string;
        lifetime?: boolean;
      };
    }
  | {
      type: "ACTIVATE_RECOVERY";
      payload: {
        activatedAt: string;
        expiresAt: string;
      };
    }
  | {
      type: "DEACTIVATE_RECOVERY";
    }
  | {
      type: "UPDATE_NOTIFICATION_SETTINGS";
      payload: Partial<NotificationSettings>;
    }
  | {
      type: "RESET_APP";
    };
