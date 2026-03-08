import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ProgressMetricCard, MilestoneCard } from "@/src/components/features";
import { ScreenContainer, SectionHeader, Divider } from "@/src/components/layout";
import { useUser } from "@/src/state";
import {
  canAccessAdvancedRelapseAnalysis,
  canAccessTriggerHeatmap,
  calculateCurrentStreak,
  calculateLongestStreak,
  calculateSmokeFreePercentage,
  calculateCigarettesAvoided,
  calculateMoneySaved,
} from "@/src/selectors";
import { spacing } from "@/src/theme";

const MILESTONES = [
  { day: 1, message: "Carbon monoxide levels normalize" },
  { day: 7, message: "Your taste buds and smell receptors begin to recover" },
  { day: 30, message: "Lung function improves by up to 30%" },
  { day: 90, message: "Circulation and oxygen levels improve" },
  { day: 365, message: "Excess risk of coronary heart disease drops to 50% of a smoker" },
];

export const ProgressScreen = () => {
  const navigation = useNavigation<any>();
  const { state } = useUser();

  const currentStreak = calculateCurrentStreak(state);
  const longestStreak = calculateLongestStreak(state);
  const smokeFreePct = calculateSmokeFreePercentage(state, 30);
  const cigarettesAvoided = calculateCigarettesAvoided(state);
  const moneySaved = calculateMoneySaved(state);
  const hasHeatmap = canAccessTriggerHeatmap(state);
  const hasAdvancedRelapse = canAccessAdvancedRelapseAnalysis(state);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Your Progress" subtitle="Evidence of who you are becoming." />

        <View style={styles.metricsGrid}>
          <ProgressMetricCard label="Current Streak" value={`${currentStreak} days`} />
          <ProgressMetricCard label="Longest Streak" value={`${longestStreak} days`} />
        </View>

        <View style={styles.metricsGrid}>
          <ProgressMetricCard label="Smoke-Free (30d)" value={`${Math.round(smokeFreePct)}%`} />
          <ProgressMetricCard
            label="Cigarettes Avoided"
            value={String(Math.round(cigarettesAvoided))}
          />
        </View>

        <View style={styles.metricsGrid}>
          <ProgressMetricCard label="Money Saved" value={`$${moneySaved.toFixed(2)}`} />
        </View>

        <SectionHeader title="Premium Analytics" subtitle="Optional deeper pattern insights" />

        <View style={styles.metricsGrid}>
          <ProgressMetricCard
            label="Trigger Heatmap"
            value={hasHeatmap ? "Unlocked" : "Premium"}
          />
          <ProgressMetricCard
            label="Relapse Analysis"
            value={hasAdvancedRelapse ? "Unlocked" : "Premium"}
          />
        </View>

        {(!hasHeatmap || !hasAdvancedRelapse) && (
          <View style={styles.lockedCard}>
            <Text style={styles.lockedText}>
              Unlock trigger heatmaps and advanced relapse analysis in Premium.
            </Text>
            <Text style={styles.lockedLink} onPress={() => navigation.navigate("You", { screen: "PremiumScreen" })}>
              View Premium
            </Text>
          </View>
        )}

        <Divider />

        <SectionHeader title="Health Recovery Timeline" subtitle="Your body is healing." />

        <View style={styles.milestonesList}>
          {MILESTONES.map((milestone) => (
            <MilestoneCard
              key={milestone.day}
              day={milestone.day}
              message={milestone.message}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  metricsGrid: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  milestonesList: {
    gap: spacing.md,
  },
  lockedCard: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: "#F6F9FC",
    gap: spacing.xs,
  },
  lockedText: {
    fontSize: 13,
    color: "#3A4A5A",
  },
  lockedLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2F80ED",
  },
});

