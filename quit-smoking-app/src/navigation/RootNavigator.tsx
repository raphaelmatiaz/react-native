import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainTabNavigator } from "@/src/navigation/MainTabNavigator";
import { OnboardingNavigator } from "@/src/navigation/OnboardingNavigator";
import { useUser } from "@/src/state";

const RootStack = createNativeStackNavigator();

export const RootNavigator = () => {
  const {
    state: { onboardingCompleted },
  } = useUser();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!onboardingCompleted ? (
        <RootStack.Screen name="OnboardingStack" component={OnboardingNavigator} />
      ) : (
        <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
      )}
    </RootStack.Navigator>
  );
};
