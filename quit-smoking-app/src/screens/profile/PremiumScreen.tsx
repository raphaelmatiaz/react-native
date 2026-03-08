import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { useUser } from "@/src/state";
import { ScreenContainer, Card, SectionHeader, Divider } from "@/src/components/layout";
import { PrimaryButton, SecondaryButton } from "@/src/components/core";
import { spacing, radii, colors } from "@/src/theme";

const PREMIUM_FEATURES = [
  { icon: "📊", title: "Trigger Heatmap" },
  { icon: "🔍", title: "Advanced Analytics" },
  { icon: "🎨", title: "Theme Customization" },
];

const PRICING_PLANS = [
  { id: "yearly", label: "Yearly", price: "$9.99" },
  { id: "lifetime", label: "Lifetime", price: "$29.99" },
];

export const PremiumScreen = () => {
  const { state } = useUser();

  const handlePurchase = (plan: string) => {
    Alert.alert("Feature coming soon", `${plan} plan purchase will be available soon.`);
  };

  if (state.premium.isPremium) {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Card>
            <Text style={styles.statusTitle}>✓ Premium Active</Text>
            <Text style={styles.statusText}>You have access to all premium features.</Text>
          </Card>

          <SectionHeader title="Premium Features" />
          {PREMIUM_FEATURES.map((feature, idx) => (
            <Card key={idx}>
              <View style={styles.featureRow}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </View>
            </Card>
          ))}

          <Divider />
          <SecondaryButton label="Manage Subscription" onPress={() => {}} />
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SectionHeader title="Unlock Premium" subtitle="Advanced tools to master your quit journey" />

        {PREMIUM_FEATURES.map((feature, idx) => (
          <Card key={idx}>
            <View style={styles.featureRow}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text style={styles.featureTitle}>{feature.title}</Text>
            </View>
          </Card>
        ))}

        <Divider />
        <SectionHeader title="Choose Your Plan" />

        {PRICING_PLANS.map((plan) => (
          <Card key={plan.id}>
            <View style={styles.planRow}>
              <View>
                <Text style={styles.planLabel}>{plan.label}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
              </View>
              <PrimaryButton label="Get" onPress={() => handlePurchase(plan.label)} />
            </View>
          </Card>
        ))}

        <SecondaryButton label="Restore Purchases" onPress={() => {}} />

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>Prices are subject to change. Your subscription renews automatically.</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  statusText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  featureRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  featureIcon: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  planRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  planPrice: {
    fontSize: 13,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  disclaimer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: `${colors.text}05`,
    borderRadius: radii.md,
    marginTop: spacing.lg,
  },
  disclaimerText: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
});
