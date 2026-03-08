import { ScrollView, StyleSheet, Text, View, Alert, Pressable } from "react-native";
import { useUser } from "@/state/user-provider";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { Card } from "@/components/layout/Card";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Divider } from "@/components/layout/Divider";
import { PrimaryButton } from "@/components/core/PrimaryButton";
import { SecondaryButton } from "@/components/core/SecondaryButton";
import { tokens } from "@/theme/tokens";

const PREMIUM_FEATURES = [
  { icon: "📊", title: "Trigger Heatmap", description: "Visualize your craving patterns over time" },
  { icon: "🔍", title: "Advanced Analytics", description: "Deep insights into your relapse triggers" },
  { icon: "🎨", title: "Theme Customization", description: "Dark mode and personalized color schemes" },
  { icon: "⏱️", title: "Extended Recovery", description: "72-hour recovery mode instead of 48 hours" },
];

const PRICING_PLANS = [
  { id: "yearly", label: "Yearly", price: "$9.99", period: "per year", description: "Best value" },
  { id: "lifetime", label: "Lifetime", price: "$29.99", period: "one-time", description: "Forever access" },
];

export const PremiumScreen = () => {
  const { state, dispatch } = useUser();

  const handlePurchase = (plan: string) => {
    // Note: This is a stub. Real IAP integration happens in Task 14.
    // For now, just show an alert mentioning this would trigger IAP flow.
    Alert.alert(
      `Get ${plan}?`,
      `In production, this would open the app store to complete your purchase. For now, this is a preview.`,
      [
        {
          text: "OK",
          onPress: () => {
            // Simulate purchase
            dispatch({
              type: "TOGGLE_PREMIUM",
              payload: {
                isPremium: true,
                purchaseDate: new Date().toISOString(),
                expiryDate: plan === "yearly" ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : null,
                lifetime: plan === "lifetime",
              },
            });
            Alert.alert("Success!", "Premium unlocked (demo mode)");
          },
        },
      ]
    );
  };

  const handleRestore = () => {
    Alert.alert(
      "Restore Purchases",
      "In production, this would check app store for your previous purchases.",
      [{ text: "OK" }]
    );
  };

  if (state.premium.isPremium) {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.premiumBadgeContainer}>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>✓ Premium Active</Text>
            </View>
          </View>

          <Card style={styles.statusCard}>
            <Text style={styles.statusTitle}>You&apos;re all set!</Text>
            <Text style={styles.statusText}>
              Enjoy all premium features including advanced analytics, heatmaps, and extended recovery mode.
            </Text>
          </Card>

          <SectionHeader title="Your Features" subtitle="Now available to you" style={styles.sectionHeader} />
          <View style={styles.featuresContainer}>
            {PREMIUM_FEATURES.map((feature, idx) => (
              <Card key={idx} style={styles.featureCard}>
                <View style={styles.featureContent}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <View style={styles.featureTextContainer}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          <Divider style={styles.divider} />

          <SecondaryButton label="Manage Subscription" onPress={handleRestore} style={styles.manageButton} />
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SectionHeader
          title="Unlock Premium"
          subtitle="Get powerful tools to master your quit journey"
          style={styles.headerSection}
        />

        {/* Features showcase */}
        <View style={styles.featuresContainer}>
          {PREMIUM_FEATURES.map((feature, idx) => (
            <Card key={idx} style={styles.featureCard}>
              <View style={styles.featureContent}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        <Divider style={styles.divider} />

        {/* Pricing plans */}
        <SectionHeader title="Choose Your Plan" subtitle="Support the app and unlock features" style={styles.pricingHeader} />
        <View style={styles.pricingContainer}>
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              style={[
                styles.pricingCard,
                plan.id === "lifetime" && styles.pricingCardHighlighted,
              ]}
            >
              {plan.id === "lifetime" && <View style={styles.recommendedBadge} />}
              <View style={styles.planHeader}>
                <Text style={styles.planLabel}>{plan.label}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
              </View>
              <Text style={styles.planPeriod}>{plan.period}</Text>
              <Text style={styles.planDescription}>{plan.description}</Text>
              <View style={styles.planDivider} />
              <PrimaryButton
                label={`Get ${plan.label}`}
                onPress={() => handlePurchase(plan.label)}
                style={styles.purchaseButton}
              />
            </Card>
          ))}
        </View>

        {/* Restore and disclaimer */}
        <SecondaryButton label="Restore Purchases" onPress={handleRestore} style={styles.restoreButton} />

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            All prices include applicable sales tax. Your subscription renews automatically unless canceled. You can cancel anytime in App Store settings.
          </Text>
        </View>

        <Divider style={styles.divider} />

        {/* FAQ or info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Any Questions?</Text>
          <Text style={styles.infoText}>
            Premium features unlock after purchase and are immediately available across the app.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
  },
  headerSection: {
    marginBottom: tokens.spacing.lg,
  },
  premiumBadgeContainer: {
    alignItems: "center",
    marginBottom: tokens.spacing.lg,
  },
  premiumBadge: {
    backgroundColor: tokens.colors.accent,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    borderRadius: tokens.radii.md,
  },
  premiumBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
  },
  statusCard: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    marginBottom: tokens.spacing.lg,
    backgroundColor: `${tokens.colors.primary}10`,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: tokens.colors.primary,
    marginBottom: tokens.spacing.sm,
  },
  statusText: {
    fontSize: 13,
    color: tokens.colors.text,
    lineHeight: 18,
  },
  sectionHeader: {
    marginBottom: tokens.spacing.md,
  },
  featuresContainer: {
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.lg,
  },
  featureCard: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
  },
  featureContent: {
    flexDirection: "row",
    gap: tokens.spacing.md,
    alignItems: "flex-start",
  },
  featureIcon: {
    fontSize: 32,
    marginRight: tokens.spacing.sm,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: tokens.colors.text,
    marginBottom: tokens.spacing.xs,
  },
  featureDescription: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
    lineHeight: 16,
  },
  pricingHeader: {
    marginBottom: tokens.spacing.md,
  },
  pricingContainer: {
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.lg,
  },
  pricingCard: {
    paddingVertical: tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.md,
    position: "relative",
  },
  pricingCardHighlighted: {
    borderWidth: 2,
    borderColor: tokens.colors.primary,
    backgroundColor: `${tokens.colors.primary}05`,
  },
  recommendedBadge: {
    position: "absolute",
    top: -12,
    left: 16,
    backgroundColor: tokens.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  planHeader: {
    marginBottom: tokens.spacing.md,
  },
  planLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: tokens.colors.text,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: "700",
    color: tokens.colors.primary,
    marginTop: tokens.spacing.xs,
  },
  planPeriod: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
    marginBottom: tokens.spacing.md,
  },
  planDescription: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
    fontStyle: "italic",
    marginBottom: tokens.spacing.md,
  },
  planDivider: {
    height: 1,
    backgroundColor: tokens.colors.border,
    marginVertical: tokens.spacing.md,
  },
  purchaseButton: {
    marginTop: 0,
  },
  divider: {
    marginVertical: tokens.spacing.lg,
  },
  restoreButton: {
    marginBottom: tokens.spacing.lg,
  },
  disclaimerBox: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    backgroundColor: `${tokens.colors.text}05`,
    borderRadius: tokens.radii.md,
  },
  disclaimerText: {
    fontSize: 11,
    color: tokens.colors.textSecondary,
    lineHeight: 15,
  },
  infoSection: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: tokens.colors.text,
    marginBottom: tokens.spacing.xs,
  },
  infoText: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
    lineHeight: 16,
  },
});
