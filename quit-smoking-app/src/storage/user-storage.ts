import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEY } from "@/src/constants/app";
import { createInitialUserState } from "@/src/state/initial-user-state";
import type { UserState } from "@/src/state/user-state";

export const migrateUserState = (value: unknown): UserState => {
  const fallbackState = createInitialUserState();

  if (!value || typeof value !== "object") {
    return fallbackState;
  }

  const candidate = value as Partial<UserState>;

  return {
    ...fallbackState,
    ...candidate,
    premium: {
      ...fallbackState.premium,
      ...(candidate.premium ?? {}),
    },
    notificationSettings: {
      ...fallbackState.notificationSettings,
      ...(candidate.notificationSettings ?? {}),
    },
    recoveryMode: {
      ...fallbackState.recoveryMode,
      ...(candidate.recoveryMode ?? {}),
    },
    milestones: {
      ...fallbackState.milestones,
      ...(candidate.milestones ?? {}),
    },
    benefits: candidate.benefits ?? fallbackState.benefits,
    cravingLogs: candidate.cravingLogs ?? fallbackState.cravingLogs,
    relapseLogs: candidate.relapseLogs ?? fallbackState.relapseLogs,
    journalEntries: candidate.journalEntries ?? fallbackState.journalEntries,
    personalReasons: candidate.personalReasons ?? fallbackState.personalReasons,
  };
};

export const loadUserState = async (): Promise<UserState> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return createInitialUserState();
    }

    const parsed = JSON.parse(stored) as unknown;
    return migrateUserState(parsed);
  } catch (error) {
    // Fallback should keep app usable when local storage is unavailable.
    console.error("Failed to load user state from storage", error);
    return createInitialUserState();
  }
};

export const persistUserState = async (state: UserState): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to persist user state", error);
  }
};
