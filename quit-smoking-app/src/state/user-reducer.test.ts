import { createInitialUserState } from "@/src/state/initial-user-state";
import { userReducer } from "@/src/state/user-reducer";

describe("user reducer", () => {
  it("updates premium fields on TOGGLE_PREMIUM", () => {
    const state = createInitialUserState();

    const next = userReducer(state, {
      type: "TOGGLE_PREMIUM",
      payload: {
        isPremium: true,
        purchaseDate: "2026-03-08T00:00:00.000Z",
        expiryDate: "2027-03-08T00:00:00.000Z",
        lifetime: false,
      },
    });

    expect(next.premium.isPremium).toBe(true);
    expect(next.premium.purchaseDate).toBe("2026-03-08T00:00:00.000Z");
    expect(next.premium.expiryDate).toBe("2027-03-08T00:00:00.000Z");
  });

  it("tracks milestone delivery once", () => {
    const state = createInitialUserState();

    const one = userReducer(state, {
      type: "MARK_MILESTONE_DELIVERED",
      payload: 7,
    });

    const two = userReducer(one, {
      type: "MARK_MILESTONE_DELIVERED",
      payload: 7,
    });

    expect(one.milestones.deliveredDays).toEqual([7]);
    expect(two.milestones.deliveredDays).toEqual([7]);
  });

  it("resets app state to initial defaults", () => {
    const state = createInitialUserState();
    state.personalReasons = ["reason"];

    const next = userReducer(state, { type: "RESET_APP" });

    expect(next.personalReasons).toEqual([]);
    expect(next.premium.isPremium).toBe(false);
    expect(next.notificationSettings.morningTime).toBe("08:00");
  });
});
