import { ScrollView, StyleSheet, Text, View, TextInput, Alert, Pressable } from "react-native";
import { useUser } from "@/state/user-provider";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { Card } from "@/components/layout/Card";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { PrimaryButton } from "@/components/core/PrimaryButton";
import { tokens } from "@/theme/tokens";
import { useState } from "react";

export const ReasonsScreen = () => {
  const { state, dispatch } = useUser();
  const [newReason, setNewReason] = useState("");

  const handleAddReason = () => {
    if (newReason.trim().length === 0) {
      Alert.alert("Please enter a reason");
      return;
    }
    if (newReason.trim().length < 5) {
      Alert.alert("Please enter a more detailed reason (at least 5 characters)");
      return;
    }

    const updatedReasons = [...state.onboarding.reasons, newReason.trim()];
    dispatch({
      type: "UPDATE_ONBOARDING_FIELDS",
      payload: { reasons: updatedReasons },
    });
    setNewReason("");
  };

  const handleRemoveReason = (index: number) => {
    if (state.onboarding.reasons.length === 1) {
      Alert.alert("You need at least one reason to quit");
      return;
    }
    const updatedReasons = state.onboarding.reasons.filter((_, i) => i !== index);
    dispatch({
      type: "UPDATE_ONBOARDING_FIELDS",
      payload: { reasons: updatedReasons },
    });
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SectionHeader title="Quitting Reasons" subtitle="Your personal motivations to stay smoke-free" />

        {/* Current reasons */}
        <View style={styles.reasonsContainer}>
          {state.onboarding.reasons.map((reason, index) => (
            <Card key={index} style={styles.reasonCard}>
              <View style={styles.reasonContent}>
                <View style={styles.reasonTextContainer}>
                  <Text style={styles.reasonBullet}>•</Text>
                  <Text style={styles.reasonText}>{reason}</Text>
                </View>
                <Pressable
                  onPress={() => handleRemoveReason(index)}
                  style={({ pressed }) => [styles.removeButton, pressed && styles.removeButtonPressed]}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </Pressable>
              </View>
            </Card>
          ))}
        </View>

        {/* Add new reason */}
        <SectionHeader title="Add a New Reason" subtitle="Reflect on what matters most to you" style={styles.addReasonHeader} />
        <Card style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Why do you want to quit?"
            placeholderTextColor={tokens.colors.textSecondary}
            value={newReason}
            onChangeText={setNewReason}
            multiline
            maxLength={200}
          />
          <Text style={styles.charCount}>{newReason.length}/200</Text>
        </Card>

        <PrimaryButton label="Save Reason" onPress={handleAddReason} style={styles.addButton} />

        {/* Info note */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Revisit these reasons whenever you feel tempted. Your motivations are your strongest tool.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
  },
  reasonsContainer: {
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.lg,
  },
  reasonCard: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
  },
  reasonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: tokens.spacing.md,
  },
  reasonTextContainer: {
    flex: 1,
    flexDirection: "row",
    gap: tokens.spacing.sm,
  },
  reasonBullet: {
    fontSize: 16,
    color: tokens.colors.primary,
    fontWeight: "600",
    marginTop: 2,
  },
  reasonText: {
    flex: 1,
    fontSize: 14,
    color: tokens.colors.text,
    lineHeight: 20,
  },
  removeButton: {
    paddingVertical: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.sm,
    backgroundColor: `${tokens.colors.error}15`,
    borderRadius: tokens.radii.sm,
  },
  removeButtonPressed: {
    opacity: 0.7,
  },
  removeButtonText: {
    fontSize: 12,
    color: tokens.colors.error,
    fontWeight: "600",
  },
  addReasonHeader: {
    marginBottom: tokens.spacing.md,
    marginTop: tokens.spacing.lg,
  },
  inputContainer: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
  },
  input: {
    fontSize: 14,
    color: tokens.colors.text,
    lineHeight: 20,
    minHeight: 80,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 11,
    color: tokens.colors.textSecondary,
    marginTop: tokens.spacing.xs,
    textAlign: "right",
  },
  addButton: {
    marginBottom: tokens.spacing.lg,
  },
  infoBox: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    backgroundColor: `${tokens.colors.accent}15`,
    borderRadius: tokens.radii.md,
    marginBottom: tokens.spacing.lg,
  },
  infoText: {
    fontSize: 13,
    color: tokens.colors.text,
    lineHeight: 18,
    fontWeight: "500",
  },
});
