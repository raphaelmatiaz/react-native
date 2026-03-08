import { migrateUserState } from "@/src/storage/user-storage";

describe("user storage migration", () => {
  it("falls back safely for invalid persisted values", () => {
    const migrated = migrateUserState(null);

    expect(migrated.version).toBeGreaterThan(0);
    expect(migrated.premium.isPremium).toBe(false);
    expect(migrated.milestones.deliveredDays).toEqual([]);
  });

  it("preserves known state and merges nested defaults", () => {
    const migrated = migrateUserState({
      onboardingCompleted: true,
      premium: {
        isPremium: true,
        purchaseDate: "2026-03-08T00:00:00.000Z",
      },
      notificationSettings: {
        morningTime: "07:15",
      },
      milestones: {
        deliveredDays: [1, 7],
      },
    });

    expect(migrated.onboardingCompleted).toBe(true);
    expect(migrated.premium.isPremium).toBe(true);
    expect(migrated.premium.purchaseDate).toBe("2026-03-08T00:00:00.000Z");
    expect(migrated.notificationSettings.morningTime).toBe("07:15");
    expect(migrated.notificationSettings.eveningTime).toBe("18:00");
    expect(migrated.milestones.deliveredDays).toEqual([1, 7]);
  });
});
