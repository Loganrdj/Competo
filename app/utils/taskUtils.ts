import { User } from '../models/User';
import { UserTask } from '../models/UserTask';
import { Group } from '../models/Group';

/**
 * Completes a task and updates points for the user and affected groups.
 */
export function completeTask(user: User, task: UserTask, groups: Group[]): void {
  const today = new Date().toISOString().split('T')[0];

  if (task.type === 'daily' && task.lastCompleted === today) return;

  if (task.type === 'repeatable') {
    if (task.maxDailyCompletions && task.completionsToday && task.completionsToday >= task.maxDailyCompletions) return;
    task.completionsToday = (task.completionsToday || 0) + 1;
  } else {
    task.lastCompleted = today;
  }

  user.totalPoints += task.pointsPerCompletion;

  if (task.source === 'group' && task.groupId) {
    const group = groups.find(g => g.id === task.groupId);
    if (group) {
      group.leaderboard[user.id] = (group.leaderboard[user.id] || 0) + task.pointsPerCompletion;
    }
  }
}
