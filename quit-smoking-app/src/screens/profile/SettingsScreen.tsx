import { ScrollView, StyleSheet, Text, View, TextInput, Switch, Alert, Pressable } from "react-native";
import { useUser } from "@/state/user-provider";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { Card } from "@/components/layout/Card";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Divider } from "@/components/layout/Divider";
import { SecondaryButton } from "@/components/core/SecondaryButton";
import { tokens } from "@/theme/tokens";

export const SettingsScreen = () => {
  const { state, dispatch } = useUser();

  const handleTimeChange = (field: "morningTime" | "eveningTime", value: string) => {
    // Simple validation: HH:MM format
    if (!value || /^\d{2}:\d{2}$/.test(value) || value.length < 5) {
      dispatch({
        type: "UPDATE_NOTIFICATION_SETTINGS",
        payload: {
          ...state.notificationSettings,
          [field]: value,
        },
      });
    }
  };

  const handleToggle = (field: keyof typeof state.notificationSettings, value: boolean) => {
    dispatch({
      type: "UPDATE_NOTIFICATION_SETTINGS",
      payload: {
        ...state.notificationSettings,
        [field]: value,
      },
    });
  };

  const handleResetApp = () => {
    Alert.alert(
      "Reset App?",
      "This will erase all data and restart onboarding. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            dispatch({ type: "RESET_APP" });
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SectionHeader title="Settings" subtitle="Customize your experience" />

        {/* Notifications Section */}
        <SectionHeader title="Notifications" style={styles.sectionHeader} />
        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Morning Motivation</Text>
              <Text style={styles.settingDescription}>Daily reminder at</Text>
            </View>
            <TextInput
              style={styles.timeInput}
              value={state.notificationSettings.morningTime}
              onChangeText={(val) => handleTimeChange("morningTime", val)}
              placeholder="07:00"
              placeholderTextColor={tokens.colors.textSecondary}
            />
          </View>
        </Card>

        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Evening Check-in</Text>
              <Text style={styles.settingDescription}>Daily reminder at</Text>
            </View>
            <TextInput
              style={styles.timeInput}
              value={state.notificationSettings.eveningTime}
              onChangeText={(val) => handleTimeChange("eveningTime", val)}
              placeholder="20:00"
              placeholderTextColor={tokens.colors.textSecondary}
            />
          </View>
        </Card>

        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Milestone Notifications</Text>
              <Text style={styles.settingDescription}>Celebrate when you hit milestones (1d, 7d, 30d, etc.)</Text>
            </View>
            <Switch
              value={state.notificationSettings.milestonesEnabled}
              onValueChange={(val) => handleToggle("milestonesEnabled", val)}
              trackColor={{ false: `${tokens.colors.text}20`, true: tokens.colors.primary }}
              thumbColor={state.notificationSettings.milestonesEnabled ? tokens.colors.accent : `${tokens.colors.text}40`}
            />
          </View>
        </Card>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 Notifications are only sent if you granted permission during onboarding.
          </Text>
        </View>

        <Divider style={styles.divider} />

        {/* Preferences Section */}
        <SectionHeader title="Preferences" style={styles.sectionHeader} />
        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Premium Theme</Text>
              <Text style={styles.settingDescription}>Dark mode and custom colors</Text>
            </View>
            <Pressable
              disabled={!state.premium.isPremium}
              style={({ pressed }) => [
                styles.premiumLock,
                !state.premium.isPremium && styles.premiumLockDisabled,
                pressed && styles.premiumLockPressed,
              ]}
            >
              <Text style={styles.premiumLockText}>{state.premium.isPremium ? "✓" : "🔒"}</Text>
            </Pressable>
          </View>
        </Card>

        <Divider style={styles.divider} />

        {/* App Section */}
        <SectionHeader title="App" style={styles.sectionHeader} />
        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>App Version</Text>
              <Text style={styles.settingDescription}>1.0.0</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.settingCard}>
          <Pressable onPress={() => Alert.alert("Privacy Policy", "Your data is stored locally on your device. No data is shared or sent to servers.")} style={({ pressed }) => pressed && { opacity: 0.7 }}>
            <View style={styles.settingRow}>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>Privacy Policy</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </Pressable>
        </Card>

        <Card style={styles.settingCard}>
          <Pressable onPress={() => Alert.alert("Terms of Service", "StreakQuit is provided as-is to support your quit smoking journey.")} style={({ pressed }) => pressed && { opacity: 0.7 }}>
            <View style={styles.settingRow}>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>Terms of Service</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </Pressable>
        </Card>

        <Divider style={styles.divider} />

        {/* Data Management */}
        <SectionHeader title="Data Management" style={styles.sectionHeader} />
        <SecondaryButton
          label="Reset App"
          onPress={handleResetApp}
          style={styles.resetButton}
          labelStyle={styles.resetButtonLabel}
        />

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ Resetting will erase all your data (streak, journal, settings) and restart onboarding.
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
  sectionHeader: {
    marginTop: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
  },
  settingCard: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    marginBottom: tokens.spacing.sm,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: tokens.spacing.md,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: tokens.colors.text,
    marginBottom: tokens.spacing.xs,
  },
  settingDescription: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
  },
  timeInput: {
    minWidth: 70,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radii.sm,
    paddingVertical: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.sm,
    fontSize: 14,
    color: tokens.colors.text,
    textAlign: "center",
    fontWeight: "600",
  },
  premiumLock: {
    width: 40,
    height: 40,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  premiumLockDisabled: {
    backgroundColor: `${tokens.colors.text}15`,
  },
  premiumLockPressed: {
    opacity: 0.7,
  },
  premiumLockText: {
    fontSize: 18,
  },
  chevron: {
    fontSize: 20,
    color: tokens.colors.textSecondary,
  },
  divider: {
    marginVertical: tokens.spacing.lg,
  },
  infoBox: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    backgroundColor: `${tokens.colors.primary}10`,
    borderRadius: tokens.radii.md,
    marginTop: tokens.spacing.sm,
    marginBottom: tokens.spacing.lg,
  },
  infoText: {
    fontSize: 12,
    color: tokens.colors.text,
    lineHeight: 16,
  },
  resetButton: {
    marginTop: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
  },
  resetButtonLabel: {
    color: tokens.colors.error,
  },
  warningBox: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    backgroundColor: `${tokens.colors.error}10`,
    borderRadius: tokens.radii.md,
    marginBottom: tokens.spacing.lg,
  },
  warningText: {
    fontSize: 12,
    color: tokens.colors.error,
    lineHeight: 16,
  },
});
