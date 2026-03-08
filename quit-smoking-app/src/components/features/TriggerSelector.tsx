import { Pressable, StyleSheet, Text, View } from "react-native";

import type { TriggerType } from "@/src/domain";
import { colors, radii, spacing } from "@/src/theme";

type TriggerSelectorProps = {
  options: TriggerType[];
  selected?: TriggerType;
  onSelect: (value: TriggerType) => void;
};

export const TriggerSelector = ({ options, selected, onSelect }: TriggerSelectorProps) => {
  return (
    <View style={styles.wrap}>
      {options.map((option) => {
        const active = option === selected;

        return (
          <Pressable
            key={option}
            style={[styles.item, active ? styles.activeItem : undefined]}
            onPress={() => onSelect(option)}>
            <Text style={[styles.text, active ? styles.activeText : undefined]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  item: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radii.medium,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: "#FFFFFF",
  },
  activeItem: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    color: colors.textPrimary,
    textTransform: "capitalize",
    fontSize: 13,
  },
  activeText: {
    color: "#FFFFFF",
  },
});
