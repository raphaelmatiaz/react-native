import { useState } from "react";
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IdentityBadge, UrgeResilienceCard } from "@/src/components/features";
import { PrimaryButton, SecondaryButton } from "@/src/components/core";
import { Card, ScreenContainer, SectionHeader, Divider } from "@/src/components/layout";
import { useUser } from "@/src/state";
import {
  canAccessExtendedRecoveryMode,
  calculateCurrentStreak,
  calculateUrgeResilienceScore,
  getUrgeResilienceLabel,
  shouldShowEthicalUpsell,
} from "@/src/selectors";
import type { TriggerType } from "@/src/domain";
import { colors, spacing } from "@/src/theme";

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { state, dispatch } = useUser();
  const [relapseModalVisible, setRelapseModalVisible] = useState(false);
  const [selectedTrigger, setSelectedTrigger] = useState<TriggerType>("stress");

  const currentStreak = calculateCurrentStreak(state);
  const resilienceScore = calculateUrgeResilienceScore(state);
  const resilienceLabel = getUrgeResilienceLabel(resilienceScore);
  const shouldShowPremiumUpsell =
    shouldShowEthicalUpsell(state, "home") && !relapseModalVisible;

  const handleRelapse = () => {
    const now = new Date().toISOString();

    dispatch({
      type: "ADD_RELAPSE_LOG",
      payload: {
        id: `relapse_${Date.now()}`,
        timestamp: now,
        trigger: selectedTrigger,
      },
    });

    const recoveryHours = canAccessExtendedRecoveryMode(state) ? 72 : 48;

    dispatch({
      type: "ACTIVATE_RECOVERY",
      payload: {
        activatedAt: now,
        expiresAt: new Date(Date.now() + recoveryHours * 60 * 60 * 1000).toISOString(),
      },
    });

    setRelapseModalVisible(false);
    Alert.alert(
      "Recovery Mode Activated",
      `You have ${recoveryHours} hours of extra support.`,
    );
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IdentityBadge days={currentStreak} />
            <Text style={styles.subtitle}>
            You are building a stronger self with each calm moment.
          </Text>
        </View>

        <Divider />

        <View style={styles.section}>
          <UrgeResilienceCard label={resilienceLabel} />
        </View>

        <Divider />

        <View style={styles.section}>
          <SectionHeader title="How are you feeling?" />
          <View style={styles.actionGrid}>
            <PrimaryButton
              label="I feel a craving"
              onPress={() => navigation.navigate("Craving")}
            />
            <SecondaryButton
              label="I slipped"
              onPress={() => setRelapseModalVisible(true)}
            />
          </View>
          <View style={styles.actionGrid}>
            <PrimaryButton
              label="I need motivation"
              onPress={() => navigation.navigate("You")}
            />
          </View>
        </View>

        <Divider />

        {shouldShowPremiumUpsell && (
          <View style={styles.section}>
            <Card>
              <Text style={styles.upsellTitle}>Continue your journey</Text>
              <Text style={styles.upsellText}>
                Premium tools help you understand and prevent your unique relapse triggers.
              </Text>
              <PrimaryButton
                label="Learn about Premium"
                onPress={() => navigation.navigate("You", { screen: "PremiumScreen" })}
              />
            </Card>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={relapseModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setRelapseModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>One cigarette is data, not failure.</Text>
            <Text style={styles.modalSubtitle}>
              What triggered this? We&apos;ll learn your pattern to make the next one easier.
            </Text>

            <View style={styles.triggerList}>
              {(["stress", "coffee", "after_meal", "driving", "social", "bored", "withdrawal"] as TriggerType[]).map((trigger) => {
                return (
                  <SecondaryButton
                    key={trigger}
                    label={trigger}
                    onPress={() => setSelectedTrigger(trigger)}
                  />
                );
              })}
            </View>

            <View style={styles.modalActions}>
              <PrimaryButton label="Log & Activate Recovery" onPress={handleRelapse} />
              <SecondaryButton
                label="Cancel"
                onPress={() => setRelapseModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  header: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    gap: spacing.lg,
  },
  actionGrid: {
    gap: spacing.md,
  },
  upsellTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  upsellText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  modalBackdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: spacing.lg,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    padding: spacing.xl,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#FFFFFF",
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  triggerList: {
    gap: spacing.sm,
  },
  modalActions: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
});
