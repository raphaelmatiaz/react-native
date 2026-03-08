import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@/state/user-provider";
import { calculateCurrentStreak } from "@/selectors/progress-selectors";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { Card } from "@/components/layout/Card";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Divider } from "@/components/layout/Divider";
import { tokens } from "@/theme/tokens";

const PROFILE_SECTIONS = [
  { id: "reasons", label: "Quitting Reasons", description: "Your personal motivations", screen: "ReasonsScreen" },
  { id: "journal", label: "Journal", description: "Track your thoughts and feelings", screen: "JournalScreen" },
  { id: "settings", label: "Settings", description: "Notifications, theme, and more", screen: "SettingsScreen" },
  { id: "premium", label: "Premium", description: "Unlock advanced features", screen: "PremiumScreen" },
];

export const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { state } = useUser();

  const currentStreak = calculateCurrentStreak(state);
  const daysQuit = Math.floor((Date.now() - new Date(state.quitStartDate).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header with identity info */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>You</Text>
          <Card style={styles.identityCard}>
            <View style={styles.identityContent}>
              <Text style={styles.identityLabel}>Days as a Non-Smoker</Text>
              <Text style={styles.streakNumber}>{currentStreak}</Text>
              <Text style={styles.dateNote}>Since {new Date(state.quitStartDate).toLocaleDateString()}</Text>
            </View>
          </Card>
        </View>

        <Divider style={styles.divider} />

        {/* Profile sections */}
        <SectionHeader title="My Profile" />
        <View style={styles.sectionsContainer}>
          {PROFILE_SECTIONS.map((section) => (
            <Pressable
              key={section.id}
              onPress={() => navigation.navigate(section.screen)}
              style={({ pressed }) => [styles.sectionItem, pressed && styles.sectionItemPressed]}
            >
              <Card style={styles.sectionCard}>
                <View style={styles.sectionContent}>
                  <View style={styles.sectionTextContainer}>
                    <Text style={styles.sectionLabel}>{section.label}</Text>
                    <Text style={styles.sectionDescription}>{section.description}</Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>

        {/* Data status */}
        <Divider style={styles.divider} />
        <View style={styles.dataStatusSection}>
          <Text style={styles.dataStatusLabel}>All data stored locally on your device</Text>
          <Text style={styles.dataStatusNote}>No account needed. No data shared.</Text>
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: tokens.colors.text,
    marginBottom: tokens.spacing.md,
  },
  identityCard: {
    paddingVertical: tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.lg,
    backgroundColor: tokens.colors.background,
    borderLeftWidth: 4,
    borderLeftColor: tokens.colors.primary,
  },
  identityContent: {
    alignItems: "center",
  },
  identityLabel: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: "700",
    color: tokens.colors.primary,
    marginTop: tokens.spacing.sm,
  },
  dateNote: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
    marginTop: tokens.spacing.sm,
  },
  divider: {
    marginVertical: tokens.spacing.lg,
  },
  sectionsContainer: {
    gap: tokens.spacing.md,
  },
  sectionItem: {
    marginBottom: 0,
  },
  sectionItemPressed: {
    opacity: 0.7,
  },
  sectionCard: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
  },
  sectionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTextContainer: {
    flex: 1,
    marginRight: tokens.spacing.md,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: tokens.colors.text,
    marginBottom: tokens.spacing.xs,
  },
  sectionDescription: {
    fontSize: 13,
    color: tokens.colors.textSecondary,
    lineHeight: 18,
  },
  chevron: {
    fontSize: 24,
    color: tokens.colors.textSecondary,
    fontWeight: "300",
  },
  dataStatusSection: {
    marginTop: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    backgroundColor: `${tokens.colors.primary}10`,
    borderRadius: tokens.radii.md,
  },
  dataStatusLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: tokens.colors.text,
    marginBottom: tokens.spacing.xs,
  },
  dataStatusNote: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
    lineHeight: 16,
  },
});
