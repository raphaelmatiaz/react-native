# StreakQuit – State Management

Pattern: React Context + useReducer

Single global provider:

<UserProvider>

---

# 1. Hydration

On app launch:

1. Show splash/loading screen.
2. Load AsyncStorage.
3. If null → create default state.
4. Hydrate context.
5. Render RootNavigator.

---

# 2. Persistence Strategy

Every state mutation:
- Dispatch reducer action
- Immediately persist full state to AsyncStorage

No partial writes.

---

# 3. Reducer Actions

- COMPLETE_ONBOARDING
- ADD_CRAVING_LOG
- ADD_RELAPSE_LOG
- ADD_JOURNAL_ENTRY
- UPDATE_REASONS
- TOGGLE_PREMIUM
- ACTIVATE_RECOVERY
- DEACTIVATE_RECOVERY
- UPDATE_NOTIFICATION_SETTINGS
- RESET_APP

---

# 4. Loading & Error Handling

If AsyncStorage fails:
- Fallback to in-memory state
- Log error
- Continue app

Do not block UI permanently.

---

# 5. No External State Libraries

Do not use Redux.
Do not use Zustand.
Keep architecture minimal.