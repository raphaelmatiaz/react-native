import * as Notifications from "expo-notifications";
import { CommonActions, useNavigation } from "@react-navigation/native";

import { PrimaryButton } from "@/src/components/core";
import { ScreenContainer, SectionHeader } from "@/src/components/layout";
import { useUser } from "@/src/state";

export const OnboardingComplete = () => {
  const navigation = useNavigation<any>();
  const { dispatch, state } = useUser();

  const handleComplete = async () => {
    try {
      await Notifications.requestPermissionsAsync();
    } catch (error) {
      console.error("Notification permission request failed", error);
    }

    const now = new Date().toISOString();

    dispatch({
      type: "COMPLETE_ONBOARDING",
      payload: {
        quitStartDate: state.quitStartDate || now,
        identityStartDate: state.identityStartDate || now,
      },
    });

    navigation
      .getParent()
      ?.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "MainTabs" }] }));
  };

  return (
    <ScreenContainer>
      <SectionHeader
        title="You are now on your non-smoker path."
        subtitle="One calm step at a time."
      />
      <PrimaryButton label="Start" onPress={handleComplete} />
    </ScreenContainer>
  );
};
