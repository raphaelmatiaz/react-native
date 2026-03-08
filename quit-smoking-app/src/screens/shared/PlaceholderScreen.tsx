import { StyleSheet, Text, View } from "react-native";

type PlaceholderScreenProps = {
  title: string;
  subtitle?: string;
};

export const PlaceholderScreen = ({ title, subtitle }: PlaceholderScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F4F7F4",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B1B1B",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: "#6B6B6B",
    textAlign: "center",
  },
});
