import { StyleSheet, Text } from "react-native";

import { Card } from "@/src/components/layout";
import { colors, spacing } from "@/src/theme";

type JournalCardProps = {
  content: string;
  timestamp: string;
};

export const JournalCard = ({ content, timestamp }: JournalCardProps) => {
  return (
    <Card>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.time}>{new Date(timestamp).toLocaleString()}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  content: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 22,
  },
  time: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    fontSize: 12,
  },
});
