# StreakQuit – Premium Logic

In-App Purchases via Expo.

---

# 1. Product Types

- yearly_subscription
- lifetime_unlock

---

# 2. Purchase Flow

On successful purchase:

Update:
premium.isPremium = true
premium.purchaseDate = now

If yearly:
premium.expiryDate = now + 1 year

If lifetime:
premium.lifetime = true

---

# 3. Expiry Check

On app launch:

If expiryDate < now:
premium.isPremium = false

---

# 4. Restore Purchases

Add restore button in PremiumScreen.

---

# 5. Feature Flag Matrix

Feature | Free | Premium
---------|------|---------
Core quitting | ✅ | ✅
Craving flow | ✅ | ✅
Basic stats | ✅ | ✅
Heatmap | ❌ | ✅
Relapse analysis | ❌ | ✅
Theme change | ❌ | ✅
Extended recovery | ❌ | ✅