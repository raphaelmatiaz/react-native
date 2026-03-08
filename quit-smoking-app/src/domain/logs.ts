import type { TriggerType } from "@/src/domain/enums";

export interface CravingLog {
  id: string;
  timestamp: string;
  trigger: TriggerType;
  intensityStart: number;
  intensityEnd: number;
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
