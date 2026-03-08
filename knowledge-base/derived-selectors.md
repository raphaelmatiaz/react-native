Derived Selectors (Must Be Pure Functions)

calculateCurrentStreak()

calculateLongestStreak()

calculateSmokeFreePercentage(days: number)

calculateMoneySaved()

calculateCigarettesAvoided()

isRecoveryModeActive()

These must not mutate state.


---

# 📄 `business-logic-spec.md`

```md
# StreakQuit – Business Logic Specification

All logic must be deterministic.

---

# 1. Smoke-Free Day Definition

A smoke-free day is:

A calendar day (local timezone) with NO relapse log entries.

If at least one relapse log exists for a day → that day is not smoke-free.

---

# 2. Current Streak Calculation

Current streak:

- Count consecutive smoke-free days starting from today backward.
- If today has relapse → streak = 0.
- If yesterday had relapse → streak = 0.
- Continue until first relapse day encountered.

---

# 3. Longest Streak

Iterate chronologically through days since quitStartDate.

Track longest consecutive smoke-free day sequence.

---

# 4. Smoke-Free Percentage

For last N days:

percentage =
(number of smoke-free days / N) * 100

If N exceeds total days since quitStartDate → clamp to available days.

---

# 5. Cigarettes Avoided

DaysSinceQuit * cigarettesPerDay
MINUS
(relapseDaysCount * cigarettesPerDay)

Simplified assumption:
1 relapse day = full daily average consumed.

---

# 6. Money Saved

CigarettesAvoided / (cigarettesPerDay * 20) * packPrice

Assume 20 cigarettes per pack.

---

# 7. Recovery Mode Rules

Triggered when:

User logs a relapse.

Behavior:
- recoveryMode.active = true
- activatedAt = now
- expiresAt = now + 48h

If another relapse occurs during active period:
Extend expiresAt by 48h from latest relapse.

---

# 8. Urge Resilience Score

Formula:

resilienceScore =
(total resisted cravings) /
(total cravings logged)

Range: 0.0 – 1.0

Displayed as:
- Low (<0.4)
- Growing (0.4–0.7)
- Strong (>0.7)

---

# 9. Milestone Triggers

Milestones unlock at:

1 day
7 days
30 days
90 days
365 days

Trigger milestone notification only once per milestone.

---

# 10. Premium Feature Gates

If premium.isPremium = false:

Hide:
- Trigger heatmap
- Advanced relapse analysis
- Extended recovery mode
- Theme customization

Core quitting logic remains fully functional.