import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

import { MILESTONE_DAYS, type MilestoneDay, type NotificationSettings, type RecoveryModeState } from "@/src/domain";
import { calculateCurrentStreak } from "@/src/selectors";
import type { UserState } from "@/src/state";

const NOTIFICATION_CHANNEL_ID = "quit-smoking-reminders";
const RECOVERY_INTERVAL_SECONDS = 12 * 60 * 60;

type NotificationKind = "daily-morning" | "daily-evening" | "recovery" | "milestone";

let isConfigured = false;

const parseTime = (value: string): { hour: number; minute: number } => {
  const [hourPart, minutePart] = value.split(":");
  const hour = Number(hourPart);
  const minute = Number(minutePart);

  if (!Number.isInteger(hour) || !Number.isInteger(minute)) {
    return { hour: 8, minute: 0 };
  }

  const safeHour = Math.min(23, Math.max(0, hour));
  const safeMinute = Math.min(59, Math.max(0, minute));

  return { hour: safeHour, minute: safeMinute };
};

const getCurrentTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";
};

const isKind = (value: unknown): value is NotificationKind => {
  return (
    value === "daily-morning" ||
    value === "daily-evening" ||
    value === "recovery" ||
    value === "milestone"
  );
};

const cancelKinds = async (kinds: NotificationKind[]): Promise<void> => {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();

  await Promise.all(
    scheduled
      .filter((request) => {
        const data = request.content.data as Record<string, unknown> | undefined;
        const kind = data?.kind;
        return isKind(kind) && kinds.includes(kind);
      })
      .map((request) => Notifications.cancelScheduledNotificationAsync(request.identifier)),
  );
};

export const configureNotifications = async (): Promise<void> => {
  if (isConfigured) {
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
      name: "Daily Support",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  isConfigured = true;
};

export const ensureNotificationPermissionsAsync = async (): Promise<boolean> => {
  const existing = await Notifications.getPermissionsAsync();

  if (existing.granted || existing.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return true;
  }

  if (existing.canAskAgain === false) {
    return false;
  }

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted || requested.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
};

export const scheduleDailyNotifications = async (settings: NotificationSettings): Promise<void> => {
  const morning = parseTime(settings.morningTime);
  const evening = parseTime(settings.eveningTime);

  await cancelKinds(["daily-morning", "daily-evening"]);

  await Notifications.scheduleNotificationAsync({
    identifier: "daily-morning",
    content: {
      title: "Morning check-in",
      body: "One calm breath. You are still becoming smoke-free.",
      data: { kind: "daily-morning" },
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: morning.hour,
      minute: morning.minute,
      channelId: NOTIFICATION_CHANNEL_ID,
    },
  });

  await Notifications.scheduleNotificationAsync({
    identifier: "daily-evening",
    content: {
      title: "Evening reflection",
      body: "You made it through today. Log one win before rest.",
      data: { kind: "daily-evening" },
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: evening.hour,
      minute: evening.minute,
      channelId: NOTIFICATION_CHANNEL_ID,
    },
  });
};

export const cancelRecoveryNotifications = async (): Promise<void> => {
  await cancelKinds(["recovery"]);
};

export const scheduleRecoveryNotifications = async (recoveryMode: RecoveryModeState): Promise<void> => {
  await cancelRecoveryNotifications();

  if (!recoveryMode.active || !recoveryMode.expiresAt) {
    return;
  }

  const now = Date.now();
  const expiresAtMs = new Date(recoveryMode.expiresAt).getTime();

  if (expiresAtMs <= now) {
    return;
  }

  let nextTimestamp = now + RECOVERY_INTERVAL_SECONDS * 1000;

  while (nextTimestamp <= expiresAtMs) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Recovery mode support",
        body: "A slip is data, not failure. Return to one grounded step now.",
        data: { kind: "recovery" },
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(nextTimestamp),
        channelId: NOTIFICATION_CHANNEL_ID,
      },
    });

    nextTimestamp += RECOVERY_INTERVAL_SECONDS * 1000;
  }
};

export const syncMilestoneNotifications = async (state: UserState): Promise<MilestoneDay[]> => {
  if (!state.notificationSettings.milestoneEnabled) {
    return [];
  }

  const delivered = new Set(state.milestones.deliveredDays);
  const currentStreak = calculateCurrentStreak(state);

  const pending = MILESTONE_DAYS.filter((day) => day <= currentStreak && !delivered.has(day));

  for (const day of pending) {
    await Notifications.scheduleNotificationAsync({
      identifier: `milestone-${day}`,
      content: {
        title: `Milestone unlocked: Day ${day}`,
        body: "Your consistency is changing your identity. Keep building this pattern.",
        data: { kind: "milestone", day },
        sound: true,
      },
      trigger: null,
    });
  }

  return pending;
};

export { getCurrentTimezone };
