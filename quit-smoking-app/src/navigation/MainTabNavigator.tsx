import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CravingScreen } from "@/src/screens/CravingScreen";
import { HomeScreen } from "@/src/screens/HomeScreen";
import { ProfileNavigator } from "@/src/navigation/ProfileNavigator";
import { ProgressScreen } from "@/src/screens/ProgressScreen";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Craving" component={CravingScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="You" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};
