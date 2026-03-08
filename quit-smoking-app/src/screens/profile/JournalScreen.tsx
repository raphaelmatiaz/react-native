import { ScrollView, StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { useUser } from "@/src/state";
import { ScreenContainer, Card, SectionHeader } from "@/src/components/layout";
import { PrimaryButton } from "@/src/components/core";
import { spacing, colors } from "@/src/theme";
import { useState } from "react";

export const JournalScreen = () => {
  const { state, dispatch } = useUser();
  const [newEntry, setNewEntry] = useState("");

  const handleAdd = () => {
    if (newEntry.trim().length === 0) return;

    dispatch({
      type: "ADD_JOURNAL_ENTRY",
      payload: {
        id: `journal_${Date.now()}`,
        timestamp: new Date().toISOString(),
        content: newEntry.trim(),
      },
    });
    setNewEntry("");
  };

  const sorted = [...state.journalEntries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    if (d.toLocaleDateString() === now.toLocaleDateString()) return `Today`;
    const y = new Date(now);
    y.setDate(y.getDate() - 1);
    if (d.toLocaleDateString() === y.toLocaleDateString()) return "Yesterday";
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SectionHeader title="Journal" subtitle="Track your thoughts" />

        <Card>
          <Text style={styles.label}>Write something...</Text>
          <TextInput
            style={styles.input}
            placeholder="How are you feeling?"
            placeholderTextColor={colors.textSecondary}
            value={newEntry}
            onChangeText={setNewEntry}
            multiline
            maxLength={500}
          />
          <Text style={styles.charCount}>{newEntry.length}/500</Text>
        </Card>

        <PrimaryButton label="Save Entry" onPress={handleAdd} />

        {sorted.length > 0 && (
          <>
            <SectionHeader title="Entries" subtitle={`${sorted.length} total`} />
            <FlatList
              data={sorted}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Card>
                  <Text style={styles.entryDate}>{formatDate(item.timestamp)}</Text>
                  <Text style={styles.entryContent}>{item.content}</Text>
                </Card>
              )}
              ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
            />
          </>
        )}
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
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
    marginBottom: spacing.sm,
    textTransform: "uppercase",
  },
  input: {
    fontSize: 14,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: "right",
  },
  entryDate: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  entryContent: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
