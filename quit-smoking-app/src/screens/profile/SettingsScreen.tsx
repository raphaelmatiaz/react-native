import { ScrollView, StyleSheet, Text, View, TextInput, Switch, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@/src/state";
import { ScreenContainer, Card, SectionHeader, Divider } from "@/src/components/layout";
import { SecondaryButton } from "@/src/components/core";
import { spacing, radii, colors } from "@/src/theme";
import { canAccessThemeCustomization } from "@/src/selectors";

export const SettingsScreen = () => {
  const navigation = useNavigation<any>();
  const { state, dispatch } = useUser();
  const hasThemeAccess = canAccessThemeCustomization(state);

  const handleTimeChange = (field: "morningTime" | "eveningTime", value: string) => {
    dispatch({
      type: "UPDATE_NOTIFICATION_SETTINGS",
      payload: {
        ...state.notificationSettings,
        [field]: value,
      },
    });
  };

  const handleToggle = (field: "milestoneEnabled", value: boolean) => {
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
      "This will erase all data and restart onboarding.",
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

        <Card>
          <Text style={styles.label}>Morning Time</Text>
          <TextInput
            style={styles.timeInput}
            value={state.notificationSettings.morningTime}
            onChangeText={(val) => handleTimeChange("morningTime", val)}
            placeholder="HH:MM"
            placeholderTextColor={colors.textSecondary}
          />
        </Card>

        <Card>
          <Text style={styles.label}>Evening Time</Text>
          <TextInput
            style={styles.timeInput}
            value={state.notificationSettings.eveningTime}
            onChangeText={(val) => handleTimeChange("eveningTime", val)}
            placeholder="HH:MM"
            placeholderTextColor={colors.textSecondary}
          />
        </Card>

        <Card>
          <Text style={styles.label}>Milestone Notifications</Text>
          <Switch
            value={state.notificationSettings.milestoneEnabled}
            onValueChange={(val) => handleToggle("milestoneEnabled", val)}
            trackColor={{ false: `${colors.text}20`, true: colors.primary }}
            thumbColor={state.notificationSettings.milestoneEnabled ? colors.accent : `${colors.text}40`}
          />
        </Card>

        <Card>
          <Text style={styles.label}>Theme Customization</Text>
          <Text style={styles.helperText}>
            {hasThemeAccess
              ? "Theme controls are available in Premium settings."
              : "Premium required for advanced theme customization."}
          </Text>
          {!hasThemeAccess && (
            <Text
              style={styles.premiumLink}
              onPress={() => navigation.navigate("PremiumScreen")}
            >
              View Premium
            </Text>
          )}
        </Card>

        <Divider />

        <SectionHeader title="Data" />
        <SecondaryButton label="Reset App" onPress={handleResetApp} />

        <View style={styles.warning}>
          <Text style={styles.warningText}>⚠️ Resetting will erase all data.</Text>
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    color: colors.text,
  },
  warning: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: `${colors.error}10`,
    borderRadius: radii.md,
    marginTop: spacing.lg,
  },
  warningText: {
    fontSize: 12,
    color: colors.error,
    lineHeight: 16,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  premiumLink: {
    marginTop: spacing.sm,
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
});
