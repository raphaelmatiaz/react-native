import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

import { PrimaryButton } from "@/src/components/core";
import { ScreenContainer, SectionHeader } from "@/src/components/layout";
import { useUser } from "@/src/state";
import { colors, radii, spacing } from "@/src/theme";

export const OnboardingSetup = () => {
  const navigation = useNavigation<any>();
  const { dispatch, state } = useUser();
  const [cigarettesPerDay, setCigarettesPerDay] = useState(String(state.cigarettesPerDay));
  const [packPrice, setPackPrice] = useState(String(state.packPrice));
  const [reasonsInput, setReasonsInput] = useState(state.personalReasons.join("\n"));

  const onContinue = () => {
    const parsedCigarettes = Number.parseInt(cigarettesPerDay, 10);
    const parsedPackPrice = Number.parseFloat(packPrice);
    const reasons = reasonsInput
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!Number.isFinite(parsedCigarettes) || parsedCigarettes <= 0) {
      Alert.alert("Invalid daily amount", "Enter a valid cigarettes-per-day value.");
      return;
    }

    if (!Number.isFinite(parsedPackPrice) || parsedPackPrice <= 0) {
      Alert.alert("Invalid pack price", "Enter a valid pack price.");
      return;
    }

    if (reasons.length < 2) {
      Alert.alert("Add more reasons", "Please add at least two personal reasons.");
      return;
    }

    dispatch({
      type: "UPDATE_ONBOARDING_FIELDS",
      payload: {
        cigarettesPerDay: parsedCigarettes,
        packPrice: parsedPackPrice,
        personalReasons: reasons,
      },
    });

    navigation.navigate("OnboardingComplete");
  };

  return (
    <ScreenContainer>
      <SectionHeader
        title="Set your baseline"
        subtitle="These values personalize your progress calculations."
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Cigarettes per day</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={cigarettesPerDay}
          onChangeText={setCigarettesPerDay}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Pack price</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={packPrice}
          onChangeText={setPackPrice}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Personal reasons (one per line)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          value={reasonsInput}
          onChangeText={setReasonsInput}
        />
      </View>

      <PrimaryButton label="Continue" onPress={onContinue} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  fieldGroup: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radii.medium,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
});
