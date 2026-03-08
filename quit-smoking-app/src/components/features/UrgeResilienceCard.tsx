import { StyleSheet, Text } from "react-native";

import { Card } from "@/src/components/layout";
import { colors, spacing } from "@/src/theme";

type UrgeResilienceCardProps = {
  label: "Low" | "Growing" | "Strong";
};

export const UrgeResilienceCard = ({ label }: UrgeResilienceCardProps) => {
  return (
    <Card>
      <Text style={styles.title}>Urge resilience: {label}</Text>
      <Text style={styles.subtitle}>Cravings are your brain rewiring.</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: 14,
    color: colors.textSecondary,
  },
});
