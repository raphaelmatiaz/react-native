import { StyleSheet, View } from "react-native";

import { colors, spacing } from "@/src/theme";

export const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.accent,
    opacity: 0.35,
    marginVertical: spacing.lg,
  },
});
