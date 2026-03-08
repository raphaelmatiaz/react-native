import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OnboardingBenefits } from "@/src/screens/onboarding/OnboardingBenefits";
import { OnboardingComplete } from "@/src/screens/onboarding/OnboardingComplete";
import { OnboardingIdentity } from "@/src/screens/onboarding/OnboardingIdentity";
import { OnboardingSetup } from "@/src/screens/onboarding/OnboardingSetup";
import { OnboardingType } from "@/src/screens/onboarding/OnboardingType";
import { OnboardingWelcome } from "@/src/screens/onboarding/OnboardingWelcome";

const Stack = createNativeStackNavigator();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcome} />
      <Stack.Screen name="OnboardingType" component={OnboardingType} />
      <Stack.Screen name="OnboardingBenefits" component={OnboardingBenefits} />
      <Stack.Screen
        name="OnboardingIdentity"
        component={OnboardingIdentity}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="OnboardingSetup" component={OnboardingSetup} />
      <Stack.Screen
        name="OnboardingComplete"
        component={OnboardingComplete}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
