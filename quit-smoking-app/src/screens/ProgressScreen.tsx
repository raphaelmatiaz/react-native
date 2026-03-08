import { ScrollView, StyleSheet, View } from "react-native";

import { ProgressMetricCard, MilestoneCard } from "@/src/components/features";
import { ScreenContainer, SectionHeader, Divider } from "@/src/components/layout";
import { useUser } from "@/src/state";
import {
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
  const { state } = useUser();

  const currentStreak = calculateCurrentStreak(state);
  const longestStreak = calculateLongestStreak(state);
  const smokeFreePct = calculateSmokeFreePercentage(state, 30);
  const cigarettesAvoided = calculateCigarettesAvoided(state);
  const moneySaved = calculateMoneySaved(state);

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
});

