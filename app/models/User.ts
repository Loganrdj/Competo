import { UserTask } from './UserTask';

export interface User {
  id: string;
  name: string;
  groupMemberships: string[];
  tasks: UserTask[];
  totalPoints: number;
}
