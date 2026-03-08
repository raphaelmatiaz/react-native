export interface CravingLog {
  id: string;
  timestamp: string;
  trigger: TriggerType;
  intensityStart: number; // 1–10
  intensityEnd: number;   // 1–10
  resisted: boolean;
}

export interface RelapseLog {
  id: string;
  timestamp: string;
  trigger: TriggerType;
}

export interface JournalEntry {
  id: string;
  timestamp: string;
  content: string;
}