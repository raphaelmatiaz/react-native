import { useCallback, useEffect, useRef } from "react";
import { AppState } from "react-native";

import { useUser } from "@/src/state";
import {
  cancelRecoveryNotifications,
  configureNotifications,
  ensureNotificationPermissionsAsync,
  getCurrentTimezone,
  scheduleDailyNotifications,
  scheduleRecoveryNotifications,
  syncMilestoneNotifications,
} from "@/src/services/notifications/notification-service";

export const NotificationManager = () => {
  const { state, dispatch, hydrated } = useUser();
  const timezoneRef = useRef(getCurrentTimezone());

  const syncNotifications = useCallback(async () => {
    if (!hydrated || !state.onboardingCompleted) {
      return;
    }

    await configureNotifications();

    const hasPermission = await ensureNotificationPermissionsAsync();

    if (!hasPermission) {
      return;
    }

    await scheduleDailyNotifications(state.notificationSettings);

    const now = Date.now();
    const expiresAtMs = state.recoveryMode.expiresAt
      ? new Date(state.recoveryMode.expiresAt).getTime()
      : 0;

    if (state.recoveryMode.active && expiresAtMs <= now) {
      await cancelRecoveryNotifications();
      dispatch({ type: "DEACTIVATE_RECOVERY" });
    } else {
      await scheduleRecoveryNotifications(state.recoveryMode);
    }

    const newlyDelivered = await syncMilestoneNotifications(state);

    for (const milestoneDay of newlyDelivered) {
      dispatch({ type: "MARK_MILESTONE_DELIVERED", payload: milestoneDay });
    }
  }, [
    dispatch,
    hydrated,
    state,
  ]);

  useEffect(() => {
    void syncNotifications();
  }, [syncNotifications]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState !== "active") {
        return;
      }

      const timezone = getCurrentTimezone();
      if (timezone !== timezoneRef.current) {
        timezoneRef.current = timezone;
        void syncNotifications();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [syncNotifications]);

  return null;
};
