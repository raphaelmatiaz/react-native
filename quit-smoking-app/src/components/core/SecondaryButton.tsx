import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radii, spacing } from "@/src/theme";

type SecondaryButtonProps = {
  label: string;
  onPress: () => void;
};

export const SecondaryButton = ({ label, onPress }: SecondaryButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radii.medium,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
