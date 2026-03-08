import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { SmokingType } from "@/src/domain";
import { ScreenContainer, SectionHeader } from "@/src/components/layout";
import { useUser } from "@/src/state";
import { colors, radii, spacing } from "@/src/theme";

const OPTIONS: { label: string; value: SmokingType }[] = [
  { label: "I smoke to deal with stress", value: "stress" },
  { label: "I smoke socially", value: "social" },
  { label: "I smoke out of boredom", value: "bored" },
  { label: "I smoke automatically", value: "automatic" },
  { label: "I've tried quitting before", value: "triedBefore" },
];

export const OnboardingType = () => {
  const navigation = useNavigation<any>();
  const { dispatch, state } = useUser();

  const onSelect = (userType: SmokingType) => {
    dispatch({ type: "UPDATE_ONBOARDING_FIELDS", payload: { userType } });
    navigation.navigate("OnboardingBenefits");
  };

  return (
    <ScreenContainer>
      <SectionHeader title="Which sounds most like you?" />
      <View style={styles.list}>
        {OPTIONS.map((option) => {
          const selected = state.userType === option.value;

          return (
            <Pressable
              key={option.value}
              style={[styles.option, selected ? styles.selectedOption : undefined]}
              onPress={() => onSelect(option.value)}>
              <Text style={[styles.optionLabel, selected ? styles.selectedText : undefined]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radii.medium,
    padding: spacing.lg,
    backgroundColor: "#FFFFFF",
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  optionLabel: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  selectedText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
