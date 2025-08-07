export type TaskType = 'oneTime' | 'daily' | 'repeatable';
export type VerificationType = 'photo' | 'healthCheck' | 'none';

export interface TaskTemplate {
  id: string;
  title: string;
  type: TaskType;
  verification: VerificationType;
  pointsPerCompletion: number; // can be negative
  maxDailyCompletions?: number;
}
