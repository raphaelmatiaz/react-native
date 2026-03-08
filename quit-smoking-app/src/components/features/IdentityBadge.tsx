import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "@/src/theme";

type IdentityBadgeProps = {
  days: number;
};

export const IdentityBadge = ({ days }: IdentityBadgeProps) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>Day {days} as a Non-Smoker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.accent,
    borderRadius: radii.large,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignSelf: "flex-start",
  },
  text: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 14,
  },
});
