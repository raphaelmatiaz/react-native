# StreakQuit – Complete Route Structure Specification

Platform: React Native (Expo)  
Navigation Library: @react-navigation/native  
Navigators Used:
- createNativeStackNavigator
- createBottomTabNavigator  

Architecture Pattern:
Root Stack → Onboarding Stack (first launch only) → Main Tabs → Nested Profile Stack

---

# 1. Navigation Overview

The app uses a gated navigation flow:

- If no local user data exists → show OnboardingStack
- If user data exists → show MainTabs

Root Navigator:

RootStack
├── OnboardingStack
└── MainTabs

Onboarding is linear and cannot be revisited once completed.

---

# 2. RootStack (createNativeStackNavigator)

Route Name: RootStack

Screens:

1. OnboardingStack (headerShown: false)
2. MainTabs (headerShown: false)

Logic:

On app launch:
- Check AsyncStorage for `@streakquit_user`
- If null → navigate to OnboardingStack
- If exists → navigate to MainTabs

After onboarding completion:
- Use navigation.reset() to replace stack with MainTabs
- Prevent returning to onboarding via back gesture

---

# 3. OnboardingStack (createNativeStackNavigator)

Header: hidden  
Gestures: disabled (except optional back between steps)  
Flow: strictly linear  

Screens (in order):

1. OnboardingWelcome
2. OnboardingType
3. OnboardingBenefits
4. OnboardingIdentity
5. OnboardingSetup
6. OnboardingComplete

No skipping allowed.

---

## 3.1 OnboardingWelcome

Route Name: OnboardingWelcome

Purpose:
Introduce identity-based quitting philosophy.

Navigation:
navigate → OnboardingType

---

## 3.2 OnboardingType

Route Name: OnboardingType

Purpose:
Capture user smoking pattern type.

Stores:
userType

Navigation:
navigate → OnboardingBenefits

---

## 3.3 OnboardingBenefits

Route Name: OnboardingBenefits

Purpose:
Capture emotional benefits cigarettes provide.

Stores:
benefits[] (multi-select)

Navigation:
navigate → OnboardingIdentity

---

## 3.4 OnboardingIdentity

Route Name: OnboardingIdentity

Purpose:
Identity commitment.

Sets:
- quitStartDate
- identityStartDate

Navigation:
navigate → OnboardingSetup

---

## 3.5 OnboardingSetup

Route Name: OnboardingSetup

Purpose:
Collect:
- cigarettesPerDay
- packPrice
- personalReasons[] (minimum 2)

Navigation:
navigate → OnboardingComplete

---

## 3.6 OnboardingComplete

Route Name: OnboardingComplete

Purpose:
Finalize AsyncStorage write.

Action:
navigation.reset({
  index: 0,
  routes: [{ name: "MainTabs" }]
})

Prevents back navigation into onboarding.

---

# 4. MainTabs (createBottomTabNavigator)

Route Name: MainTabs

Tab Order:

1. Home
2. Craving
3. Progress
4. You

Tab bar:
- Labels visible
- Minimal design
- No excessive animation

---

## 4.1 Home Tab

Route Name: HomeScreen

Purpose:
Primary dashboard.

Contains:
- Identity Badge
- Urge Resilience Indicator
- Quick Action Buttons

Possible navigation actions:
- Navigate to CravingScreen
- Open Relapse modal (internal state)
- Navigate to PremiumScreen (from upsell)

No nested stack here.

---

## 4.2 Craving Tab

Route Name: CravingScreen

Purpose:
Craving intervention flow.

Important:
This is a single route.
Do NOT create separate routes for each step.

Flow handled via internal state machine:

States:
- TriggerSelection
- Normalization
- Timer
- IntensityCheck
- Ritual
- Completion

No navigation push/pop between these states.
Conditional rendering only.

---

## 4.3 Progress Tab

Route Name: ProgressScreen

Purpose:
Display metrics and health timeline.

Static screen.
No nested routes.

---

## 4.4 You Tab

Route Name: ProfileStack

This tab contains a nested stack navigator.

---

# 5. ProfileStack (Nested Native Stack)

Navigator Type:
createNativeStackNavigator

Structure:

ProfileStack
├── ProfileScreen
├── ReasonsScreen
├── JournalScreen
├── SettingsScreen
└── PremiumScreen

Header:
Visible for nested routes.

---

## 5.1 ProfileScreen

Route Name: ProfileScreen

Purpose:
Identity hub.

Links to:
- ReasonsScreen
- JournalScreen
- SettingsScreen
- PremiumScreen

---

## 5.2 ReasonsScreen

Route Name: ReasonsScreen

Purpose:
Edit personal quitting reasons.

Back:
navigate.goBack()

---

## 5.3 JournalScreen

Route Name: JournalScreen

Purpose:
Local-only journal entries.

Back:
navigate.goBack()

---

## 5.4 SettingsScreen

Route Name: SettingsScreen

Purpose:
Manage:
- Notification times
- Reset app
- Theme (Premium feature)
- Legal info

Back:
navigate.goBack()

---

## 5.5 PremiumScreen

Route Name: PremiumScreen

Purpose:
Subscription paywall.

Accessed from:
- ProfileScreen
- Upsell prompts (via navigation.navigate("PremiumScreen"))

Back:
navigate.goBack()

---

# 6. Navigation Behavior Rules

1. Onboarding cannot be accessed after completion.
2. Craving flow does not use navigation transitions.
3. Relapse flow should not be a separate route — implement as:
   - Modal component OR
   - Internal state view inside HomeScreen
4. PremiumScreen only accessible via ProfileStack.
5. Use navigation.reset after onboarding completion.
6. Disable gesture back on:
   - OnboardingIdentity
   - OnboardingComplete

---

# 7. Total Route Count

RootStack:
- OnboardingStack
- MainTabs

OnboardingStack:
- 6 screens

MainTabs:
- 4 tabs

ProfileStack:
- 5 screens

Total distinct route components:
17

---

# 8. Suggested Folder Structure

/navigation
  RootNavigator.tsx
  OnboardingNavigator.tsx
  MainTabNavigator.tsx
  ProfileNavigator.tsx

/screens
  /onboarding
    OnboardingWelcome.tsx
    OnboardingType.tsx
    OnboardingBenefits.tsx
    OnboardingIdentity.tsx
    OnboardingSetup.tsx
    OnboardingComplete.tsx

  HomeScreen.tsx
  CravingScreen.tsx
  ProgressScreen.tsx

  /profile
    ProfileScreen.tsx
    ReasonsScreen.tsx
    JournalScreen.tsx
    SettingsScreen.tsx
    PremiumScreen.tsx

---

# 9. Deep Linking (Optional Future)

Reserved route paths:

streakquit://craving  
streakquit://progress  
streakquit://premium  

Not required for MVP.

---

# Final Navigation Principles

Navigation must feel:

- Calm
- Predictable
- Linear
- Intentional
- Psychologically safe

Avoid:
- Chaotic modal stacks
- Over-nesting
- Excess route fragmentation
- Gamified transitions

Clarity supports behavior change.