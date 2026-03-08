import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { UrgeTimer, TriggerSelector, IntensitySlider } from "@/src/components/features";
import { PrimaryButton } from "@/src/components/core";
import { ScreenContainer, SectionHeader, Divider, Card } from "@/src/components/layout";
import type { TriggerType } from "@/src/domain";
import { useUser } from "@/src/state";
import { colors, spacing } from "@/src/theme";
import { calculateCurrentStreak } from "@/src/selectors";

type CravingStep = "triggerSelect" | "normalize" | "timer" | "intensity" | "ritual" | "complete";

const TRIGGER_MESSAGES: Record<TriggerType, string> = {
  stress: "Your brain learned to associate stress with nicotine relief. This is conditioning—not weakness.",
  coffee: "Coffee rituals are strong. You&apos;re retraining that association.",
  after_meal: "Post-meal cigarettes are automatic. Your body will adjust.",
  driving: "Driving triggers are powerful. Sit with this one.",
  social: "Social pressure is real. You can choose your path here.",
  bored: "Boredom is temporary. Ride this out.",
  withdrawal: "This is your brain rewiring. It passes.",
};

const RITUAL_GUIDANCE: Record<TriggerType, string> = {
  stress:
    "Try this now:\n1. Inhale 4 seconds\n2. Hold 4 seconds\n3. Exhale 6 seconds\n4. Repeat 5 times",
  coffee: "Wake up without nicotine:\n1. Drink water\n2. Stretch for 20 seconds\n3. Take a walk",
  after_meal:
    "Replace the post-meal ritual:\n1. Brush your teeth\n2. Take a short walk\n3. Sip water or tea",
  driving: "Safe driving replacement:\n1. Audio book or podcast\n2. Hands-free call a friend\n3. Gum or mints",
  social: "Social success tool:\n1. Step outside\n2. Let others know your journey\n3. Find your space",
  bored: "Fill the void:\n1. Stretching or movement\n2. Call someone\n3. Do one small task",
  withdrawal: "Ride your brain rewiring:\n1. Breathwork (4-4-6 pattern)\n2. Movement\n3. Know this is temporary",
};

export const CravingScreen = () => {
  const { state, dispatch } = useUser();
  const [step, setStep] = useState<CravingStep>("triggerSelect");
  const [selectedTrigger, setSelectedTrigger] = useState<TriggerType>("stress");
  const [intensityStart, setIntensityStart] = useState(5);
  const [intensityEnd, setIntensityEnd] = useState(3);
  const [timerFinished, setTimerFinished] = useState(false);

  const currentStreak = calculateCurrentStreak(state);
  const cravingResisted = state.cravingLogs.filter((log) => log.resisted).length;

  const handleStartTimer = () => {
    setStep("timer");
  };

  const handleTimerComplete = () => {
    setTimerFinished(true);
    setStep("intensity");
  };

  const handleIntensitySubmit = () => {
    setStep("ritual");
  };

  const handleRitualComplete = () => {
    setStep("complete");
  };

  const handleCompleteFlow = async () => {
    const now = new Date().toISOString();

    dispatch({
      type: "ADD_CRAVING_LOG",
      payload: {
        id: `craving_${Date.now()}`,
        timestamp: now,
        trigger: selectedTrigger,
        intensityStart,
        intensityEnd,
        resisted: true,
      },
    });

    Alert.alert(
      "Craving Resisted",
      `You've handled ${cravingResisted + 1} cravings already. This is who you're becoming.`,
    );

    setStep("triggerSelect");
    setIntensityStart(5);
    setIntensityEnd(3);
    setTimerFinished(false);
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {step === "triggerSelect" && (
          <>
            <SectionHeader title="What triggered this craving?" subtitle="Name it. Understand it." />
            <TriggerSelector
              options={["stress", "coffee", "after_meal", "driving", "social", "bored", "withdrawal"]}
              selected={selectedTrigger}
              onSelect={setSelectedTrigger}
            />
            <PrimaryButton label="Next" onPress={handleStartTimer} />
          </>
        )}

        {step === "normalize" && (
          <>
            <Text style={styles.message}>{TRIGGER_MESSAGES[selectedTrigger]}</Text>
            <PrimaryButton label="Start Timer" onPress={handleStartTimer} />
          </>
        )}

        {step === "timer" && (
          <>
            <SectionHeader title="Ride the wave" subtitle="Most cravings peak in 3–5 minutes." />
            <View style={styles.timerContainer}>
              <UrgeTimer durationSeconds={180} />
            </View>
            <PrimaryButton label="Continue" onPress={handleTimerComplete} />
          </>
        )}

        {step === "intensity" && timerFinished && (
          <>
            <SectionHeader
              title="How intense is it now?"
              subtitle="Track the drop. You&apos;re learning cravings pass."
            />
            <Card>
              <Text style={styles.intensityLabel}>
                Started at: <Text style={styles.intensityValue}>{intensityStart}/10</Text>
              </Text>
              <Divider />
              <IntensitySlider value={intensityEnd} onChange={setIntensityEnd} />
            </Card>
            <PrimaryButton label="Next" onPress={handleIntensitySubmit} />
          </>
        )}

        {step === "ritual" && (
          <>
            <SectionHeader title="Replace the ritual" subtitle="Don&apos;t suppress. Replace." />
            <Card>
              <Text style={styles.ritualText}>{RITUAL_GUIDANCE[selectedTrigger]}</Text>
            </Card>
            <PrimaryButton label="I&apos;ve done this" onPress={handleRitualComplete} />
          </>
        )}

        {step === "complete" && (
          <>
            <View style={styles.completeCard}>
              <Text style={styles.completeIcon}>✓</Text>
              <Text style={styles.completeTitle}>You handled this one.</Text>
              <Text style={styles.completeSubtitle}>
                You&apos;ve resisted {cravingResisted + 1} cravings. This is who you&apos;re becoming.
              </Text>
              <Text style={styles.streakText}>Day {currentStreak} as a non-smoker</Text>
            </View>
            <PrimaryButton label="Done" onPress={handleCompleteFlow} />
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  message: {
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  timerContainer: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
  },
  intensityLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  intensityValue: {
    fontWeight: "700",
    color: colors.primary,
  },
  ritualText: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: "monospace",
  },
  completeCard: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
  completeIcon: {
    fontSize: 48,
    color: colors.success,
  },
  completeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  completeSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  streakText: {
    marginTop: spacing.md,
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
});

