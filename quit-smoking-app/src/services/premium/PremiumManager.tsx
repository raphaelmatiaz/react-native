import { useEffect } from "react";

import { hasPremiumExpired } from "@/src/selectors";
import { useUser } from "@/src/state";

export const PremiumManager = () => {
  const { state, dispatch, hydrated } = useUser();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!hasPremiumExpired(state)) {
      return;
    }

    dispatch({
      type: "TOGGLE_PREMIUM",
      payload: {
        isPremium: false,
        lifetime: false,
        expiryDate: undefined,
      },
    });
  }, [dispatch, hydrated, state]);

  return null;
};
