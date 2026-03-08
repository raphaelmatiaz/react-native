import { createInitialUserState } from "@/src/state/initial-user-state";
import type { UserAction } from "@/src/state/user-actions";
import type { UserState } from "@/src/state/user-state";

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "HYDRATE_STATE":
      return action.payload;
    case "COMPLETE_ONBOARDING":
      return {
        ...state,
        onboardingCompleted: true,
        quitStartDate: action.payload.quitStartDate,
        identityStartDate: action.payload.identityStartDate,
      };
    case "UPDATE_ONBOARDING_FIELDS":
      return {
        ...state,
        ...action.payload,
      };
    case "ADD_CRAVING_LOG":
      return {
        ...state,
        cravingLogs: [...state.cravingLogs, action.payload],
      };
    case "ADD_RELAPSE_LOG":
      return {
        ...state,
        relapseLogs: [...state.relapseLogs, action.payload],
      };
    case "ADD_JOURNAL_ENTRY":
      return {
        ...state,
        journalEntries: [...state.journalEntries, action.payload],
      };
    case "UPDATE_REASONS":
      return {
        ...state,
        personalReasons: action.payload,
      };
    case "TOGGLE_PREMIUM":
      return {
        ...state,
        premium: {
          ...state.premium,
          ...action.payload,
        },
      };
    case "ACTIVATE_RECOVERY":
      return {
        ...state,
        recoveryMode: {
          active: true,
          activatedAt: action.payload.activatedAt,
          expiresAt: action.payload.expiresAt,
        },
      };
    case "DEACTIVATE_RECOVERY":
      return {
        ...state,
        recoveryMode: {
          active: false,
        },
      };
    case "UPDATE_NOTIFICATION_SETTINGS":
      return {
        ...state,
        notificationSettings: {
          ...state.notificationSettings,
          ...action.payload,
        },
      };
    case "MARK_MILESTONE_DELIVERED":
      if (state.milestones.deliveredDays.includes(action.payload)) {
        return state;
      }

      return {
        ...state,
        milestones: {
          ...state.milestones,
          deliveredDays: [...state.milestones.deliveredDays, action.payload],
        },
      };
    case "RESET_APP":
      return createInitialUserState();
    default:
      return state;
  }
};
