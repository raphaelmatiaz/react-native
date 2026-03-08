import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { JournalScreen } from "@/src/screens/profile/JournalScreen";
import { PremiumScreen } from "@/src/screens/profile/PremiumScreen";
import { ProfileScreen } from "@/src/screens/profile/ProfileScreen";
import { ReasonsScreen } from "@/src/screens/profile/ReasonsScreen";
import { SettingsScreen } from "@/src/screens/profile/SettingsScreen";

const Stack = createNativeStackNavigator();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: "You" }} />
      <Stack.Screen name="ReasonsScreen" component={ReasonsScreen} options={{ title: "Reasons" }} />
      <Stack.Screen name="JournalScreen" component={JournalScreen} options={{ title: "Journal" }} />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
      <Stack.Screen name="PremiumScreen" component={PremiumScreen} options={{ title: "Premium" }} />
    </Stack.Navigator>
  );
};
