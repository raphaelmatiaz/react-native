import type { UserState } from "@/src/state/user-state";

const DAY_MS = 24 * 60 * 60 * 1000;

const startOfLocalDay = (value: string | Date): Date => {
  const date = value instanceof Date ? value : new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const toDayKey = (value: string | Date): string => {
  const date = value instanceof Date ? value : new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getRelapseDaySet = (state: UserState): Set<string> => {
  return new Set(state.relapseLogs.map((log) => toDayKey(log.timestamp)));
};

const getDaysSinceQuitInclusive = (quitStartDate: string, now = new Date()): number => {
  const start = startOfLocalDay(quitStartDate).getTime();
  const end = startOfLocalDay(now).getTime();

  if (end < start) {
    return 0;
  }

  return Math.floor((end - start) / DAY_MS) + 1;
};

const getTrackedDayKeys = (state: UserState, now = new Date()): string[] => {
  const totalDays = getDaysSinceQuitInclusive(state.quitStartDate, now);
  const startDay = startOfLocalDay(state.quitStartDate);

  return Array.from({ length: totalDays }, (_, offset) => {
    const date = new Date(startDay);
    date.setDate(startDay.getDate() + offset);
    return toDayKey(date);
  });
};

export const calculateCurrentStreak = (state: UserState, now = new Date()): number => {
  const relapseDays = getRelapseDaySet(state);
  const today = startOfLocalDay(now);
  const todayKey = toDayKey(today);

  if (relapseDays.has(todayKey)) {
    return 0;
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (relapseDays.has(toDayKey(yesterday))) {
    return 0;
  }

  const quitStart = startOfLocalDay(state.quitStartDate);
  let streak = 0;
  const cursor = new Date(today);

  while (cursor >= quitStart) {
    if (relapseDays.has(toDayKey(cursor))) {
      break;
    }

    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

export const calculateLongestStreak = (state: UserState, now = new Date()): number => {
  const relapseDays = getRelapseDaySet(state);
  const dayKeys = getTrackedDayKeys(state, now);

  let longest = 0;
  let current = 0;

  dayKeys.forEach((dayKey) => {
    if (relapseDays.has(dayKey)) {
      current = 0;
      return;
    }

    current += 1;
    if (current > longest) {
      longest = current;
    }
  });

  return longest;
};

export const calculateSmokeFreePercentage = (
  state: UserState,
  days: number,
  now = new Date(),
): number => {
  if (days <= 0) {
    return 0;
  }

  const trackedDayKeys = getTrackedDayKeys(state, now);
  const relapseDays = getRelapseDaySet(state);
  const windowSize = Math.min(days, trackedDayKeys.length);

  if (windowSize === 0) {
    return 0;
  }

  const sample = trackedDayKeys.slice(-windowSize);
  const smokeFreeDays = sample.filter((dayKey) => !relapseDays.has(dayKey)).length;

  return (smokeFreeDays / windowSize) * 100;
};

export const calculateCigarettesAvoided = (state: UserState, now = new Date()): number => {
  const totalDays = getDaysSinceQuitInclusive(state.quitStartDate, now);
  const relapseDaysCount = getRelapseDaySet(state).size;
  const avoided = totalDays * state.cigarettesPerDay - relapseDaysCount * state.cigarettesPerDay;

  return Math.max(0, avoided);
};

export const calculateMoneySaved = (state: UserState, now = new Date()): number => {
  if (state.cigarettesPerDay <= 0) {
    return 0;
  }

  const cigarettesAvoided = calculateCigarettesAvoided(state, now);
  const packsAvoided = cigarettesAvoided / (state.cigarettesPerDay * 20);

  return packsAvoided * state.packPrice;
};

export const isRecoveryModeActive = (state: UserState, now = new Date()): boolean => {
  if (!state.recoveryMode.active || !state.recoveryMode.expiresAt) {
    return false;
  }

  return new Date(state.recoveryMode.expiresAt).getTime() > now.getTime();
};

export const calculateUrgeResilienceScore = (state: UserState): number => {
  if (state.cravingLogs.length === 0) {
    return 0;
  }

  const resistedCount = state.cravingLogs.filter((log) => log.resisted).length;
  return resistedCount / state.cravingLogs.length;
};

export const getUrgeResilienceLabel = (score: number): "Low" | "Growing" | "Strong" => {
  if (score < 0.4) {
    return "Low";
  }

  if (score <= 0.7) {
    return "Growing";
  }

  return "Strong";
};
