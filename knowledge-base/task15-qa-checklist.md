# Task 15 QA Checklist

This checklist captures manual reliability checks that complement unit tests.

## Onboarding and Navigation Reset
- [ ] Fresh install starts in onboarding flow.
- [ ] Completing onboarding resets to Main tabs (`Home`, `Craving`, `Progress`, `You`).
- [ ] App relaunch stays in Main tabs when onboarding is completed.

## Relapse and Recovery Transitions
- [ ] Logging relapse adds relapse entry and activates recovery mode.
- [ ] Relapse during active recovery extends `expiresAt` forward.
- [ ] Recovery support notifications stop after expiry.

## Notifications
- [ ] Denied notification permission does not block app usage.
- [ ] Morning and evening reminders schedule from Settings times.
- [ ] Timezone change + app resume triggers reschedule.

## Premium Gates (Free vs Premium)
- [ ] Free user sees premium locks for heatmap, advanced analysis, and theme customization.
- [ ] Purchasing yearly unlocks premium and sets `expiryDate`.
- [ ] Purchasing lifetime unlocks premium with `lifetime=true`.
- [ ] Expired yearly premium downgrades at launch.

## Persistence and Restart Hydration
- [ ] App restart restores all core data from AsyncStorage.
- [ ] Restart preserves premium and milestone state.

## Tone and Safety Review
- [ ] Craving copy remains calm and non-shaming.
- [ ] Relapse copy remains data-oriented and supportive.
- [ ] Upsells are not shown in craving/relapse crisis contexts.
