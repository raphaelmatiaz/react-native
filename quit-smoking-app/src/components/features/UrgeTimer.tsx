import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "@/src/theme";

type UrgeTimerProps = {
  durationSeconds?: number;
};

export const UrgeTimer = ({ durationSeconds = 180 }: UrgeTimerProps) => {
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remainingSeconds % 60).toString().padStart(2, "0");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ride the wave</Text>
      <Text style={styles.time}>
        {minutes}:{seconds}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.sm,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  time: {
    color: colors.primary,
    fontSize: 36,
    fontWeight: "700",
  },
});
