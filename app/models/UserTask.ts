import { TaskType, VerificationType } from './TaskTemplate';

export interface UserTask {
  id: string;
  title: string;
  type: TaskType;
  verification: VerificationType;
  pointsPerCompletion: number;
  maxDailyCompletions?: number;

  originalTaskId: string;
  source: 'personal' | 'group';
  groupId?: string;

  lastCompleted?: string; // ISO string
  completionsToday?: number;
}
