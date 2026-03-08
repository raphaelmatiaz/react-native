import { type PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { colors, radii, shadows, spacing } from "@/src/theme";

export const Card = ({ children }: PropsWithChildren) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.medium,
    padding: spacing.lg,
    ...shadows.card,
  },
});
