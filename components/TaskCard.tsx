import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserTask } from '../app/models/UserTask';
import { useThemeColors } from '../constants/theme';

type Props = {
  task: UserTask;
  onComplete: (task: UserTask, deltaPoints: number) => void;
};

const TaskCard = ({ task, onComplete }: Props) => {
  const colors = useThemeColors();
  const today = new Date().toISOString().split('T')[0];

  const isDaily = task.type === 'daily';
  const isRepeatable = task.type === 'repeatable';
  const isCompleted = task.lastCompleted === today;

  const handlePress = () => {
    const points = Number(task.pointsPerCompletion) || 0; // Ensure it's a number
  
    if (isDaily) {
      const nowCompleted = !isCompleted;
      const delta = nowCompleted ? points : -points;
  
      onComplete(
        {
          ...task,
          lastCompleted: nowCompleted ? today : '',
        },
        delta
      );
    }
  
    if (isRepeatable) {
      onComplete(
        {
          ...task,
          completionsToday: (task.completionsToday ?? 0) + 1,
        },
        points
      );
    }
  };
  

  const renderCheckbox = () => {
    if (isRepeatable) {
      const count = task.completionsToday ?? 0;
      return (
        <View style={[styles.repeatCount, { backgroundColor: colors.text }]}>
          <Text style={{ color: colors.background, fontWeight: 'bold' }}>{count}</Text>
        </View>
      );
    }

    return (
      <View style={[styles.checkbox, isCompleted && styles.checked]}>
        {isCompleted && <Text style={styles.checkmark}>✔</Text>}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={handlePress}
    >
      <View style={styles.row}>
        <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
        {renderCheckbox()}
      </View>
      <Text
        style={[
          styles.points,
          { color: task.pointsPerCompletion >= 0 ? colors.success : colors.danger },
        ]}
      >
        {task.pointsPerCompletion >= 0 ? '+' : ''}
        {task.pointsPerCompletion} pts
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
  points: {
    marginTop: 8,
    fontWeight: '600',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#00ff99',
    borderColor: '#00ff99',
  },
  checkmark: {
    color: '#000',
    fontWeight: 'bold',
  },
  repeatCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskCard;
