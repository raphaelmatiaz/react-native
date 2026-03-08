import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radii, spacing } from "@/src/theme";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

export const PrimaryButton = ({ label, onPress }: PrimaryButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.medium,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
