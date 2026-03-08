import { StyleSheet, Text } from "react-native";

import { Card } from "@/src/components/layout";
import { colors, spacing } from "@/src/theme";

type MilestoneCardProps = {
  day: number;
  message: string;
};

export const MilestoneCard = ({ day, message }: MilestoneCardProps) => {
  return (
    <Card>
      <Text style={styles.day}>Day {day}</Text>
      <Text style={styles.message}>{message}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  day: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  message: {
    marginTop: spacing.sm,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
