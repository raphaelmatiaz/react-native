# StreakQuit – Notification Logic

Uses Expo Notifications.

---

# 1. Permission Flow

On onboarding completion:

- Request notification permission.
- If denied:
  - Continue app normally.
  - Disable notification scheduling.

---

# 2. Scheduled Notifications

Morning:
notificationSettings.morningTime

Evening:
notificationSettings.eveningTime

Schedule repeating daily trigger.

---

# 3. Recovery Mode Notifications

When recoveryMode.active = true:

Schedule additional notification:
Every 12 hours until expiresAt.

Cancel after expiry.

---

# 4. Milestone Notifications

When streak hits milestone:
- Fire one-time notification
- Mark milestone as delivered

Never repeat same milestone.

---

# 5. Timezone Handling

On app resume:
- Check device timezone
- Reschedule notifications if changed