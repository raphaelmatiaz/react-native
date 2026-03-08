import { StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/core/PrimaryButton";
import { Card } from "@/src/components/layout";
import { colors, spacing } from "@/src/theme";

type PremiumBannerProps = {
  onPress: () => void;
};

export const PremiumBanner = ({ onPress }: PremiumBannerProps) => {
  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.title}>Ready for deeper tools?</Text>
        <Text style={styles.subtitle}>Premium unlocks advanced trigger and relapse insights.</Text>
        <PrimaryButton label="View Premium" onPress={onPress} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
