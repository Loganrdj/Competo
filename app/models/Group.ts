import { TaskTemplate } from './TaskTemplate';

export interface Group {
  id: string;
  name: string;
  members: string[];
  customTasks: TaskTemplate[];
  leaderboard: Record<string, number>; // userId -> points
}
