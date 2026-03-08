import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@/src/state";
import { calculateCurrentStreak } from "@/src/selectors";
import { ScreenContainer, Card, SectionHeader, Divider } from "@/src/components/layout";
import { spacing, radii, colors } from "@/src/theme";

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

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header with identity info */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>You</Text>
          <Card>
            <View style={styles.identityContent}>
              <Text style={styles.identityLabel}>Days as a Non-Smoker</Text>
              <Text style={styles.streakNumber}>{currentStreak}</Text>
              <Text style={styles.dateNote}>Since {new Date(state.quitStartDate).toLocaleDateString()}</Text>
            </View>
          </Card>
        </View>

        <Divider />

        {/* Profile sections */}
        <SectionHeader title="My Profile" />
        <View style={styles.sectionsContainer}>
          {PROFILE_SECTIONS.map((section) => (
            <Pressable
              key={section.id}
              onPress={() => navigation.navigate(section.screen)}
              style={({ pressed }) => [styles.sectionItem, pressed && styles.sectionItemPressed]}
            >
              <Card>
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
        <Divider />
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
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  headerSection: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  identityCard: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  identityContent: {
    alignItems: "center",
  },
  identityLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: "700",
    color: colors.primary,
    marginTop: spacing.sm,
  },
  dateNote: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  divider: {
    marginVertical: spacing.lg,
  },
  sectionsContainer: {
    gap: spacing.md,
  },
  sectionItem: {
    marginBottom: 0,
  },
  sectionItemPressed: {
    opacity: 0.7,
  },
  sectionCard: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTextContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  chevron: {
    fontSize: 24,
    color: colors.textSecondary,
    fontWeight: "300",
  },
  dataStatusSection: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: `${colors.primary}10`,
    borderRadius: radii.md,
  },
  dataStatusLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  dataStatusNote: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
