import { type PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { colors, spacing } from "@/src/theme";

export const ScreenContainer = ({ children }: PropsWithChildren) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
});
