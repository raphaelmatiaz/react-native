# StreakQuit - Full Task List

## 1. Foundation Setup
- [X] Confirm Expo app boots on iOS, Android, and web dev target.
- [X] Enable strict TypeScript settings and verify `tsconfig.json` quality gates.
- [X] Install and configure core dependencies:
- [X] `@react-navigation/native`
- [X] `@react-navigation/native-stack`
- [X] `@react-navigation/bottom-tabs`
- [X] `@react-native-async-storage/async-storage`
- [X] `expo-notifications`
- [X] `expo-linear-gradient` (if needed for visual polish)
- [X] `expo-in-app-purchases` or target IAP package used by Expo version.
- [X] Create base folder structure:
- [X] `src/navigation`
- [X] `src/screens/onboarding`
- [X] `src/screens/profile`
- [X] `src/screens`
- [X] `src/components/core`
- [X] `src/components/layout`
- [X] `src/components/features`
- [X] `src/state`
- [X] `src/storage`
- [X] `src/selectors`
- [X] `src/services/notifications`
- [X] `src/services/premium`
- [X] `src/theme`
- [X] `src/utils`
- [X] Add lint and formatting scripts if missing.

## 2. Domain Types and Data Contracts
- [X] Create TypeScript domain types:
- [X] `SmokingType`, `BenefitType`, `TriggerType`
- [X] `CravingLog`, `RelapseLog`, `JournalEntry`
- [X] `NotificationSettings`
- [X] `PremiumState`
- [X] `RecoveryModeState`
- [X] Create `UserState` interface with versioned root schema.
- [X] Create `initialUserState` factory for first-run defaults.
- [X] Define constants:
- [X] AsyncStorage key `@streakquit_user`
- [X] app state schema version
- [X] milestone day thresholds `[1, 7, 30, 90, 365]`

## 3. State Management and Persistence
- [X] Implement React Context + `useReducer` global provider (`UserProvider`).
- [X] Define reducer action types:
- [X] `COMPLETE_ONBOARDING`
- [X] `ADD_CRAVING_LOG`
- [X] `ADD_RELAPSE_LOG`
- [X] `ADD_JOURNAL_ENTRY`
- [X] `UPDATE_REASONS`
- [X] `TOGGLE_PREMIUM`
- [X] `ACTIVATE_RECOVERY`
- [X] `DEACTIVATE_RECOVERY`
- [X] `UPDATE_NOTIFICATION_SETTINGS`
- [X] `RESET_APP`
- [X] Implement hydration flow on launch:
- [X] show loading state
- [X] load AsyncStorage
- [X] fallback to defaults if null
- [X] handle parse/version errors safely
- [X] Implement full-state persistence after each reducer mutation.
- [X] Add non-blocking error handling for storage failures.
- [X] Add migration strategy hook for future schema versions.

## 4. Business Logic and Pure Selectors
- [X] Implement pure selectors (no mutation):
- [X] `calculateCurrentStreak()`
- [X] `calculateLongestStreak()`
- [X] `calculateSmokeFreePercentage(days)`
- [X] `calculateMoneySaved()`
- [X] `calculateCigarettesAvoided()`
- [X] `isRecoveryModeActive()`
- [X] Implement smoke-free day classification by local calendar day.
- [X] Implement relapse-aware current streak rules (including today/yesterday logic).
- [X] Implement longest streak over chronological day sequence.
- [X] Implement clamped smoke-free percentage for last N days.
- [X] Implement cigarettes avoided estimate using relapse day deduction.
- [X] Implement money saved with 20-cigarettes-per-pack rule.
- [X] Implement urge resilience score and display tiers:
- [X] Low `<0.4`
- [X] Growing `0.4-0.7`
- [X] Strong `>0.7`

## 5. Navigation Architecture
- [X] Build `RootNavigator` (stack): `OnboardingStack` or `MainTabs` by hydrated state.
- [X] Build `OnboardingNavigator` with 6 linear screens.
- [X] Build `MainTabNavigator` with tabs order:
- [X] Home
- [X] Craving
- [X] Progress
- [X] You
- [X] Build nested `ProfileNavigator` stack with:
- [X] `ProfileScreen`
- [X] `ReasonsScreen`
- [X] `JournalScreen`
- [X] `SettingsScreen`
- [X] `PremiumScreen`
- [X] Apply `navigation.reset` from onboarding completion to `MainTabs`.
- [X] Disable gesture-back on `OnboardingIdentity` and `OnboardingComplete`.
- [X] Keep Craving flow as single route with internal state machine.
- [X] Keep Relapse flow as modal/internal state (not separate route).

## 6. Design System and Reusable UI
- [X] Implement theme tokens from spec:
- [X] colors
- [X] spacing scale
- [X] radii
- [X] shadows
- [X] Implement shared layout components:
- [X] `ScreenContainer`
- [X] `Card`
- [X] `SectionHeader`
- [X] `Divider`
- [X] Implement reusable feature/core components:
- [X] `IdentityBadge`
- [X] `UrgeResilienceCard`
- [X] `PrimaryButton`
- [X] `SecondaryButton`
- [X] `TriggerSelector`
- [X] `UrgeTimer`
- [X] `IntensitySlider`
- [X] `ProgressMetricCard`
- [X] `MilestoneCard`
- [X] `JournalCard`
- [X] `PremiumBanner`
- [X] Ensure no inline styles and no duplicated UI logic.
- [X] Validate visual tone: calm, supportive, non-gamified.

## 7. Onboarding Flow Implementation
- [X] Build `OnboardingWelcome` with identity-first framing.
- [X] Build `OnboardingType` and store `userType`.
- [X] Build `OnboardingBenefits` with multi-select `benefits[]`.
- [X] Build `OnboardingIdentity` commit step and set:
- [X] `quitStartDate`
- [X] `identityStartDate`
- [X] Build `OnboardingSetup` and collect:
- [X] `cigarettesPerDay`
- [X] `packPrice`
- [X] `personalReasons[]` (min 2)
- [X] Build `OnboardingComplete` and persist final onboarding state.
- [X] Trigger notification permission request at onboarding completion.

## 8. Home Screen
- [X] Show identity badge text style: "Day X as a Non-Smoker".
- [X] Show urge resilience status and supportive explanation.
- [X] Add quick actions:
- [X] "I feel a craving"
- [X] "I slipped"
- [X] "I need motivation"
- [X] Wire action to open Craving tab/flow.
- [X] Wire "I slipped" to relapse modal/internal flow.
- [X] Add optional upsell entry point outside crisis contexts.

## 9. Craving Intervention Flow
- [X] Implement single-screen state machine steps:
- [X] Trigger selection
- [X] normalization copy
- [X] 3-minute urge timer
- [X] intensity check start/end
- [X] replacement ritual
- [X] completion and identity reminder
- [X] Add trigger-specific normalization messages.
- [X] Implement timer UX for 3 to 5 minute peak education.
- [X] Log craving entry with `resisted` and intensity delta.
- [X] Display progress feedback without guilt framing.

## 10. Relapse and Recovery Mode Flow
- [X] Build relapse logging flow in Home context/modal.
- [X] Capture trigger and timestamp for each relapse.
- [X] Ensure messaging is non-shaming and data-oriented.
- [X] Do not hard-reset all progress to zero.
- [X] Display longest streak, smoke-free percentage, and avoided cigarettes.
- [X] Activate recovery mode for 48 hours on relapse.
- [X] Extend recovery expiry by 48 hours if relapse occurs during active mode.
- [X] Surface additional recovery support UX while active.

## 11. Progress Screen
- [X] Show metrics cards:
- [X] total smoke-free days
- [X] longest streak
- [X] cigarettes not smoked
- [X] money saved
- [X] Show evidence-based lung recovery timeline milestones.
- [X] Implement milestone unlock tracking.
- [X] Ensure milestone notifications fire only once.

## 12. You / Profile Area
- [X] Build `ProfileScreen` identity hub.
- [X] Build `ReasonsScreen` for editing quitting reasons.
- [X] Build `JournalScreen` (local-only entries CRUD-lite).
- [X] Build `SettingsScreen`:
- [X] notification times
- [X] milestone notification toggle
- [X] app reset
- [X] theme (premium-gated)
- [X] legal info placeholder
- [X] Build `PremiumScreen` paywall and restore action.

## 13. Notifications
- [X] Configure Expo notifications setup and permissions.
- [X] Schedule repeating daily morning notification at `morningTime`.
- [X] Schedule repeating daily evening notification at `eveningTime`.
- [X] Schedule additional every-12-hours notifications during recovery mode.
- [X] Cancel recovery notifications when recovery mode expires.
- [X] Trigger one-time milestone notifications and store delivered flags.
- [X] On app resume, detect timezone changes and reschedule as needed.
- [X] Ensure app behaves normally if permission denied.

## 14. Premium and Purchase Logic
- [X] Configure IAP products:
- [X] `yearly_subscription`
- [X] `lifetime_unlock`
- [X] Implement purchase success handling:
- [X] set `premium.isPremium = true`
- [X] set `purchaseDate`
- [X] yearly sets `expiryDate`
- [X] lifetime sets `lifetime = true`
- [X] Implement launch-time expiry validation.
- [X] Implement restore purchases flow.
- [X] Gate features:
- [X] trigger heatmap
- [X] advanced relapse analysis
- [X] theme customization
- [X] extended recovery mode
- [X] Keep core quitting functionality fully free.
- [X] Implement ethical upsell timings (7 days, 30 days, 20 resisted cravings).
- [X] Never upsell during craving or relapse crisis flows.

## 15. QA, Testing, and Reliability
- [X] Unit test selectors and business logic edge cases.
- [X] Unit test reducer transitions and persistence triggers.
- [X] Test onboarding gating and `navigation.reset` behavior.
- [X] Test relapse/recovery transitions including multiple relapses.
- [X] Test notification schedule/cancel/reschedule behavior.
- [X] Test premium gate matrix for free vs premium users.
- [X] Test timezone change handling.
- [X] Test first-run with denied notification permissions.
- [X] Test app restart hydration consistency.
- [X] Validate all copy tone is calm/supportive and non-shaming.

## 16. Release Readiness
- [X] Final copy review for emotional precision and consistency.
- [X] App icon, splash, and store assets aligned to positioning.
- [X] Validate ASO metadata and screenshots.
- [X] Add legal/privacy copy clarifying local-only data model.
- [X] Verify EAS build profiles for dev/preview/prod.
- [ ] Run production builds and smoke tests on target devices.
- [X] Prepare launch checklist and post-launch metric tracking plan.

## 17. Post-MVP Backlog (Explicitly Out of Scope)
- [ ] Social features
- [ ] Cloud backup and sync
- [ ] AI coaching
- [ ] Apple Watch integration
- [ ] Widgets
- [ ] Deep linking routes (`streakquit://...`) as optional future enhancement
