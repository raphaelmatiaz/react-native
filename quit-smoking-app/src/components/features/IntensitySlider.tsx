import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "@/src/theme";

type IntensitySliderProps = {
  value: number;
  onChange: (nextValue: number) => void;
};

export const IntensitySlider = ({ value, onChange }: IntensitySliderProps) => {
  const decrease = () => onChange(Math.max(1, value - 1));
  const increase = () => onChange(Math.min(10, value + 1));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Intensity: {value}/10</Text>
      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={decrease}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={increase}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: "600",
  },
  controls: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: radii.medium,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
});
