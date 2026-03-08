import { useNavigation } from "@react-navigation/native";

import { PrimaryButton } from "@/src/components/core";
import { ScreenContainer, SectionHeader } from "@/src/components/layout";

export const OnboardingWelcome = () => {
  const navigation = useNavigation<any>();

  return (
    <ScreenContainer>
      <SectionHeader
        title="You are becoming someone who does not need cigarettes."
        subtitle="This journey is about identity, not guilt."
      />
      <PrimaryButton label="Continue" onPress={() => navigation.navigate("OnboardingType")} />
    </ScreenContainer>
  );
};
