import { ScrollView, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useUser } from "@/src/state";
import { ScreenContainer, Card, SectionHeader } from "@/src/components/layout";
import { PrimaryButton } from "@/src/components/core";
import { spacing, colors } from "@/src/theme";
import { useState } from "react";

export const ReasonsScreen = () => {
  const { state, dispatch } = useUser();
  const [newReason, setNewReason] = useState("");

  const handleAddReason = () => {
    if (newReason.trim().length < 5) {
      Alert.alert("Enter at least 5 characters");
      return;
    }

    const updated = [...state.personalReasons, newReason.trim()];
    dispatch({
      type: "HYDRATE_STATE",
      payload: { ...state, personalReasons: updated },
    });
    setNewReason("");
  };

  const handleRemove = (index: number) => {
    if (state.personalReasons.length === 1) {
      Alert.alert("You need at least one reason");
      return;
    }
    const updated = state.personalReasons.filter((_, i) => i !== index);
    dispatch({
      type: "HYDRATE_STATE",
      payload: { ...state, personalReasons: updated },
    });
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SectionHeader title="Your Reasons" subtitle="Why you want to quit" />

        {state.personalReasons.map((reason, idx) => (
          <Card key={idx}>
            <View style={styles.reasonRow}>
              <Text style={styles.reasonText}>{reason}</Text>
              <Text style={styles.removeLink} onPress={() => handleRemove(idx)}>Remove</Text>
            </View>
          </Card>
        ))}

        <SectionHeader title="Add a Reason" />
        <Card>
          <TextInput
            style={styles.input}
            placeholder="Why do you want to quit?"
            placeholderTextColor={colors.textSecondary}
            value={newReason}
            onChangeText={setNewReason}
            multiline
            maxLength={200}
          />
          <Text style={styles.charCount}>{newReason.length}/200</Text>
        </Card>

        <PrimaryButton label="Save Reason" onPress={handleAddReason} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  reasonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reasonText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  removeLink: {
    fontSize: 12,
    color: colors.error,
    fontWeight: "600",
    marginLeft: spacing.md,
  },
  input: {
    fontSize: 14,
    color: colors.text,
    minHeight: 80,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: "right",
  },
});
