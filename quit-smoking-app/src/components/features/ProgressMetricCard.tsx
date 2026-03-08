import { StyleSheet, Text } from "react-native";

import { Card } from "@/src/components/layout";
import { colors, spacing } from "@/src/theme";

type ProgressMetricCardProps = {
  label: string;
  value: string;
};

export const ProgressMetricCard = ({ label, value }: ProgressMetricCardProps) => {
  return (
    <Card>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  value: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "700",
  },
  label: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    fontSize: 14,
  },
});
