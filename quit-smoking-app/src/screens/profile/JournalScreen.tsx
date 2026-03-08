import { ScrollView, StyleSheet, Text, View, TextInput, Alert, Pressable, FlatList } from "react-native";
import { useUser } from "@/state/user-provider";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { Card } from "@/components/layout/Card";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { PrimaryButton } from "@/components/core/PrimaryButton";
import { tokens } from "@/theme/tokens";
import { useState } from "react";

export const JournalScreen = () => {
  const { state, dispatch } = useUser();
  const [newEntry, setNewEntry] = useState("");

  const handleAddEntry = () => {
    if (newEntry.trim().length === 0) {
      Alert.alert("Please write something");
      return;
    }

    dispatch({
      type: "ADD_JOURNAL_ENTRY",
      payload: {
        id: `journal_${Date.now()}`,
        timestamp: new Date().toISOString(),
        entry: newEntry.trim(),
      },
    });
    setNewEntry("");
  };

  const handleDeleteEntry = (entryId: string) => {
    Alert.alert(
      "Delete Entry?",
      "This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedEntries = state.journalEntries.filter((e) => e.id !== entryId);
            dispatch({
              type: "HYDRATE_STATE",
              payload: {
                ...state,
                journalEntries: updatedEntries,
              },
            });
          },
        },
      ]
    );
  };

  const sortedEntries = [...state.journalEntries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateStr = date.toLocaleDateString();
    const todayStr = today.toLocaleDateString();
    const yesterdayStr = yesterday.toLocaleDateString();

    if (dateStr === todayStr) return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    if (dateStr === yesterdayStr) return `Yesterday, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SectionHeader title="Journal" subtitle="Capture your thoughts and reflections" />

        {/* New entry form */}
        <Card style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Write your thoughts...</Text>
          <TextInput
            style={styles.input}
            placeholder="What&apos;s on your mind?"
            placeholderTextColor={tokens.colors.textSecondary}
            value={newEntry}
            onChangeText={setNewEntry}
            multiline
            maxLength={500}
          />
          <Text style={styles.charCount}>{newEntry.length}/500</Text>
        </Card>

        <PrimaryButton label="Save Entry" onPress={handleAddEntry} style={styles.saveButton} />

        {/* Entries list */}
        {sortedEntries.length > 0 && (
          <View style={styles.entriesSection}>
            <SectionHeader title={`${sortedEntries.length} Entries`} subtitle="Your journey in your own words" />
            <FlatList
              data={sortedEntries}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Card key={item.id} style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryDate}>{formatDate(item.timestamp)}</Text>
                    <Pressable
                      onPress={() => handleDeleteEntry(item.id)}
                      style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.entryText}>{item.entry}</Text>
                </Card>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}

        {sortedEntries.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📝</Text>
            <Text style={styles.emptyStateTitle}>No Entries Yet</Text>
            <Text style={styles.emptyStateText}>Start journaling to track your progress and emotions</Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
  },
  inputContainer: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
  },
  inputLabel: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: tokens.spacing.sm,
  },
  input: {
    fontSize: 14,
    color: tokens.colors.text,
    lineHeight: 20,
    minHeight: 100,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 11,
    color: tokens.colors.textSecondary,
    marginTop: tokens.spacing.xs,
    textAlign: "right",
  },
  saveButton: {
    marginBottom: tokens.spacing.lg,
  },
  entriesSection: {
    marginTop: tokens.spacing.lg,
  },
  entryCard: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacing.sm,
    paddingBottom: tokens.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.border,
  },
  entryDate: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
    fontWeight: "500",
  },
  deleteButton: {
    paddingVertical: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.sm,
    backgroundColor: `${tokens.colors.error}15`,
    borderRadius: tokens.radii.sm,
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  deleteButtonText: {
    fontSize: 11,
    color: tokens.colors.error,
    fontWeight: "600",
  },
  entryText: {
    fontSize: 14,
    color: tokens.colors.text,
    lineHeight: 20,
  },
  separator: {
    height: tokens.spacing.md,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: tokens.spacing.xxxl,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: tokens.spacing.md,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: tokens.colors.text,
    marginBottom: tokens.spacing.sm,
  },
  emptyStateText: {
    fontSize: 13,
    color: tokens.colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
});
