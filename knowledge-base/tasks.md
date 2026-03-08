# StreakQuit - Full Task List

## 1. Foundation Setup
- [ ] Confirm Expo app boots on iOS, Android, and web dev target.
- [ ] Enable strict TypeScript settings and verify `tsconfig.json` quality gates.
- [ ] Install and configure core dependencies:
- [ ] `@react-navigation/native`
- [ ] `@react-navigation/native-stack`
- [ ] `@react-navigation/bottom-tabs`
- [ ] `@react-native-async-storage/async-storage`
- [ ] `expo-notifications`
- [ ] `expo-linear-gradient` (if needed for visual polish)
- [ ] `expo-in-app-purchases` or target IAP package used by Expo version.
- [ ] Create base folder structure:
- [ ] `src/navigation`
- [ ] `src/screens/onboarding`
- [ ] `src/screens/profile`
- [ ] `src/screens`
- [ ] `src/components/core`
- [ ] `src/components/layout`
- [ ] `src/components/features`
- [ ] `src/state`
- [ ] `src/storage`
- [ ] `src/selectors`
- [ ] `src/services/notifications`
- [ ] `src/services/premium`
- [ ] `src/theme`
- [ ] `src/utils`
- [ ] Add lint and formatting scripts if missing.

## 2. Domain Types and Data Contracts
- [ ] Create TypeScript domain types:
- [ ] `SmokingType`, `BenefitType`, `TriggerType`
- [ ] `CravingLog`, `RelapseLog`, `JournalEntry`
- [ ] `NotificationSettings`
- [ ] `PremiumState`
- [ ] `RecoveryModeState`
- [ ] Create `UserState` interface with versioned root schema.
- [ ] Create `initialUserState` factory for first-run defaults.
- [ ] Define constants:
- [ ] AsyncStorage key `@streakquit_user`
- [ ] app state schema version
- [ ] milestone day thresholds `[1, 7, 30, 90, 365]`

## 3. State Management and Persistence
- [ ] Implement React Context + `useReducer` global provider (`UserProvider`).
- [ ] Define reducer action types:
- [ ] `COMPLETE_ONBOARDING`
- [ ] `ADD_CRAVING_LOG`
- [ ] `ADD_RELAPSE_LOG`
- [ ] `ADD_JOURNAL_ENTRY`
- [ ] `UPDATE_REASONS`
- [ ] `TOGGLE_PREMIUM`
- [ ] `ACTIVATE_RECOVERY`
- [ ] `DEACTIVATE_RECOVERY`
- [ ] `UPDATE_NOTIFICATION_SETTINGS`
- [ ] `RESET_APP`
- [ ] Implement hydration flow on launch:
- [ ] show loading state
- [ ] load AsyncStorage
- [ ] fallback to defaults if null
- [ ] handle parse/version errors safely
- [ ] Implement full-state persistence after each reducer mutation.
- [ ] Add non-blocking error handling for storage failures.
- [ ] Add migration strategy hook for future schema versions.

## 4. Business Logic and Pure Selectors
- [ ] Implement pure selectors (no mutation):
- [ ] `calculateCurrentStreak()`
- [ ] `calculateLongestStreak()`
- [ ] `calculateSmokeFreePercentage(days)`
- [ ] `calculateMoneySaved()`
- [ ] `calculateCigarettesAvoided()`
- [ ] `isRecoveryModeActive()`
- [ ] Implement smoke-free day classification by local calendar day.
- [ ] Implement relapse-aware current streak rules (including today/yesterday logic).
- [ ] Implement longest streak over chronological day sequence.
- [ ] Implement clamped smoke-free percentage for last N days.
- [ ] Implement cigarettes avoided estimate using relapse day deduction.
- [ ] Implement money saved with 20-cigarettes-per-pack rule.
- [ ] Implement urge resilience score and display tiers:
- [ ] Low `<0.4`
- [ ] Growing `0.4-0.7`
- [ ] Strong `>0.7`

## 5. Navigation Architecture
- [ ] Build `RootNavigator` (stack): `OnboardingStack` or `MainTabs` by hydrated state.
- [ ] Build `OnboardingNavigator` with 6 linear screens.
- [ ] Build `MainTabNavigator` with tabs order:
- [ ] Home
- [ ] Craving
- [ ] Progress
- [ ] You
- [ ] Build nested `ProfileNavigator` stack with:
- [ ] `ProfileScreen`
- [ ] `ReasonsScreen`
- [ ] `JournalScreen`
- [ ] `SettingsScreen`
- [ ] `PremiumScreen`
- [ ] Apply `navigation.reset` from onboarding completion to `MainTabs`.
- [ ] Disable gesture-back on `OnboardingIdentity` and `OnboardingComplete`.
- [ ] Keep Craving flow as single route with internal state machine.
- [ ] Keep Relapse flow as modal/internal state (not separate route).

## 6. Design System and Reusable UI
- [ ] Implement theme tokens from spec:
- [ ] colors
- [ ] spacing scale
- [ ] radii
- [ ] shadows
- [ ] Implement shared layout components:
- [ ] `ScreenContainer`
- [ ] `Card`
- [ ] `SectionHeader`
- [ ] `Divider`
- [ ] Implement reusable feature/core components:
- [ ] `IdentityBadge`
- [ ] `UrgeResilienceCard`
- [ ] `PrimaryButton`
- [ ] `SecondaryButton`
- [ ] `TriggerSelector`
- [ ] `UrgeTimer`
- [ ] `IntensitySlider`
- [ ] `ProgressMetricCard`
- [ ] `MilestoneCard`
- [ ] `JournalCard`
- [ ] `PremiumBanner`
- [ ] Ensure no inline styles and no duplicated UI logic.
- [ ] Validate visual tone: calm, supportive, non-gamified.

## 7. Onboarding Flow Implementation
- [ ] Build `OnboardingWelcome` with identity-first framing.
- [ ] Build `OnboardingType` and store `userType`.
- [ ] Build `OnboardingBenefits` with multi-select `benefits[]`.
- [ ] Build `OnboardingIdentity` commit step and set:
- [ ] `quitStartDate`
- [ ] `identityStartDate`
- [ ] Build `OnboardingSetup` and collect:
- [ ] `cigarettesPerDay`
- [ ] `packPrice`
- [ ] `personalReasons[]` (min 2)
- [ ] Build `OnboardingComplete` and persist final onboarding state.
- [ ] Trigger notification permission request at onboarding completion.

## 8. Home Screen
- [ ] Show identity badge text style: "Day X as a Non-Smoker".
- [ ] Show urge resilience status and supportive explanation.
- [ ] Add quick actions:
- [ ] "I feel a craving"
- [ ] "I slipped"
- [ ] "I need motivation"
- [ ] Wire action to open Craving tab/flow.
- [ ] Wire "I slipped" to relapse modal/internal flow.
- [ ] Add optional upsell entry point outside crisis contexts.

## 9. Craving Intervention Flow
- [ ] Implement single-screen state machine steps:
- [ ] Trigger selection
- [ ] normalization copy
- [ ] 3-minute urge timer
- [ ] intensity check start/end
- [ ] replacement ritual
- [ ] completion and identity reminder
- [ ] Add trigger-specific normalization messages.
- [ ] Implement timer UX for 3 to 5 minute peak education.
- [ ] Log craving entry with `resisted` and intensity delta.
- [ ] Display progress feedback without guilt framing.

## 10. Relapse and Recovery Mode Flow
- [ ] Build relapse logging flow in Home context/modal.
- [ ] Capture trigger and timestamp for each relapse.
- [ ] Ensure messaging is non-shaming and data-oriented.
- [ ] Do not hard-reset all progress to zero.
- [ ] Display longest streak, smoke-free percentage, and avoided cigarettes.
- [ ] Activate recovery mode for 48 hours on relapse.
- [ ] Extend recovery expiry by 48 hours if relapse occurs during active mode.
- [ ] Surface additional recovery support UX while active.

## 11. Progress Screen
- [ ] Show metrics cards:
- [ ] total smoke-free days
- [ ] longest streak
- [ ] cigarettes not smoked
- [ ] money saved
- [ ] Show evidence-based lung recovery timeline milestones.
- [ ] Implement milestone unlock tracking.
- [ ] Ensure milestone notifications fire only once.

## 12. You / Profile Area
- [ ] Build `ProfileScreen` identity hub.
- [ ] Build `ReasonsScreen` for editing quitting reasons.
- [ ] Build `JournalScreen` (local-only entries CRUD-lite).
- [ ] Build `SettingsScreen`:
- [ ] notification times
- [ ] milestone notification toggle
- [ ] app reset
- [ ] theme (premium-gated)
- [ ] legal info placeholder
- [ ] Build `PremiumScreen` paywall and restore action.

## 13. Notifications
- [ ] Configure Expo notifications setup and permissions.
- [ ] Schedule repeating daily morning notification at `morningTime`.
- [ ] Schedule repeating daily evening notification at `eveningTime`.
- [ ] Schedule additional every-12-hours notifications during recovery mode.
- [ ] Cancel recovery notifications when recovery mode expires.
- [ ] Trigger one-time milestone notifications and store delivered flags.
- [ ] On app resume, detect timezone changes and reschedule as needed.
- [ ] Ensure app behaves normally if permission denied.

## 14. Premium and Purchase Logic
- [ ] Configure IAP products:
- [ ] `yearly_subscription`
- [ ] `lifetime_unlock`
- [ ] Implement purchase success handling:
- [ ] set `premium.isPremium = true`
- [ ] set `purchaseDate`
- [ ] yearly sets `expiryDate`
- [ ] lifetime sets `lifetime = true`
- [ ] Implement launch-time expiry validation.
- [ ] Implement restore purchases flow.
- [ ] Gate features:
- [ ] trigger heatmap
- [ ] advanced relapse analysis
- [ ] theme customization
- [ ] extended recovery mode
- [ ] Keep core quitting functionality fully free.
- [ ] Implement ethical upsell timings (7 days, 30 days, 20 resisted cravings).
- [ ] Never upsell during craving or relapse crisis flows.

## 15. QA, Testing, and Reliability
- [ ] Unit test selectors and business logic edge cases.
- [ ] Unit test reducer transitions and persistence triggers.
- [ ] Test onboarding gating and `navigation.reset` behavior.
- [ ] Test relapse/recovery transitions including multiple relapses.
- [ ] Test notification schedule/cancel/reschedule behavior.
- [ ] Test premium gate matrix for free vs premium users.
- [ ] Test timezone change handling.
- [ ] Test first-run with denied notification permissions.
- [ ] Test app restart hydration consistency.
- [ ] Validate all copy tone is calm/supportive and non-shaming.

## 16. Release Readiness
- [ ] Final copy review for emotional precision and consistency.
- [ ] App icon, splash, and store assets aligned to positioning.
- [ ] Validate ASO metadata and screenshots.
- [ ] Add legal/privacy copy clarifying local-only data model.
- [ ] Verify EAS build profiles for dev/preview/prod.
- [ ] Run production builds and smoke tests on target devices.
- [ ] Prepare launch checklist and post-launch metric tracking plan.

## 17. Post-MVP Backlog (Explicitly Out of Scope)
- [ ] Social features
- [ ] Cloud backup and sync
- [ ] AI coaching
- [ ] Apple Watch integration
- [ ] Widgets
- [ ] Deep linking routes (`streakquit://...`) as optional future enhancement
