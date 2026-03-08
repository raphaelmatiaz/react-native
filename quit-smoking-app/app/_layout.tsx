import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { NotificationManager } from '@/src/services/notifications';
import { PremiumManager } from '@/src/services/premium';
import { UserProvider } from '@/src/state';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <NotificationManager />
      <PremiumManager />
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </UserProvider>
  );
}
