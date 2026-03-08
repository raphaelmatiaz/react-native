export type MilestoneDay = 1 | 7 | 30 | 90 | 365;

export const MILESTONE_DAYS: MilestoneDay[] = [1, 7, 30, 90, 365];

export interface MilestoneState {
  deliveredDays: MilestoneDay[];
}
