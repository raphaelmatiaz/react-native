import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { loadUserState, persistUserState } from "@/src/storage/user-storage";
import { createInitialUserState } from "@/src/state/initial-user-state";
import type { UserAction } from "@/src/state/user-actions";
import { userReducer } from "@/src/state/user-reducer";
import type { UserState } from "@/src/state/user-state";

type UserContextValue = {
  state: UserState;
  dispatch: (action: UserAction) => void;
  hydrated: boolean;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(userReducer, undefined, createInitialUserState);
  const [hydrated, setHydrated] = useState(false);
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      const loadedState = await loadUserState();

      if (!isMounted) {
        return;
      }

      dispatch({ type: "HYDRATE_STATE", payload: loadedState });
      hasHydratedRef.current = true;
      setHydrated(true);
    };

    void hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasHydratedRef.current) {
      return;
    }

    void persistUserState(state);
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      hydrated,
    }),
    [hydrated, state],
  );

  if (!hydrated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
