import { useNavigation } from "@react-navigation/native";

import { PrimaryButton } from "@/src/components/core";
import { ScreenContainer, SectionHeader } from "@/src/components/layout";
import { useUser } from "@/src/state";

export const OnboardingIdentity = () => {
  const navigation = useNavigation<any>();
  const { dispatch } = useUser();

  const onCommit = () => {
    const now = new Date().toISOString();

    dispatch({
      type: "UPDATE_ONBOARDING_FIELDS",
      payload: {
        quitStartDate: now,
        identityStartDate: now,
      },
    });

    navigation.navigate("OnboardingSetup");
  };

  return (
    <ScreenContainer>
      <SectionHeader
        title="Are you ready to become a non-smoker today?"
        subtitle="You do not need to wait for a perfect date."
      />
      <PrimaryButton label="Yes. Starting now." onPress={onCommit} />
    </ScreenContainer>
  );
};
