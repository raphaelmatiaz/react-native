import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/core";
import { ScreenContainer, SectionHeader } from "@/src/components/layout";
import type { BenefitType } from "@/src/domain";
import { useUser } from "@/src/state";
import { colors, radii, spacing } from "@/src/theme";

const OPTIONS: { label: string; value: BenefitType }[] = [
  { label: "Calm", value: "calm" },
  { label: "Break", value: "break" },
  { label: "Focus", value: "focus" },
  { label: "Comfort", value: "comfort" },
  { label: "Identity", value: "identity" },
  { label: "Control", value: "control" },
];

export const OnboardingBenefits = () => {
  const navigation = useNavigation<any>();
  const { dispatch, state } = useUser();

  const toggleBenefit = (value: BenefitType) => {
    const nextBenefits = state.benefits.includes(value)
      ? state.benefits.filter((item) => item !== value)
      : [...state.benefits, value];

    dispatch({ type: "UPDATE_ONBOARDING_FIELDS", payload: { benefits: nextBenefits } });
  };

  return (
    <ScreenContainer>
      <SectionHeader title="What do cigarettes give you?" subtitle="Choose all that apply." />
      <View style={styles.grid}>
        {OPTIONS.map((option) => {
          const selected = state.benefits.includes(option.value);

          return (
            <Pressable
              key={option.value}
              style={[styles.option, selected ? styles.selectedOption : undefined]}
              onPress={() => toggleBenefit(option.value)}>
              <Text style={[styles.optionText, selected ? styles.selectedText : undefined]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <PrimaryButton
        label="Next"
        onPress={() => navigation.navigate("OnboardingIdentity")}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  grid: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radii.medium,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: "#FFFFFF",
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  optionText: {
    color: colors.textPrimary,
    fontSize: 15,
    textAlign: "center",
  },
  selectedText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
