import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { UserTask } from '../../app/models/UserTask';
import TaskCard from '../../components/TaskCard';
import { useThemeColors } from '../../constants/theme';

const initialTasks: UserTask[] = [
  {
    id: '1',
    title: 'Go to the gym',
    type: 'daily',
    verification: 'none',
    pointsPerCompletion: 10,
    originalTaskId: 'template-1',
    source: 'personal',
  },
  {
    id: '2',
    title: 'Drink water',
    type: 'repeatable',
    verification: 'none',
    pointsPerCompletion: 1,
    originalTaskId: 'template-2',
    source: 'personal',
  },
];

const TaskScreen = () => {
  const colors = useThemeColors();
  const [tasks, setTasks] = useState<UserTask[]>(initialTasks);
  const [totalPoints, setTotalPoints] = useState(0);

  const handleComplete = (updatedTask: UserTask, deltaPoints: number) => {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTotalPoints(prev => prev + deltaPoints);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={[styles.total, { color: totalPoints >= 0 ? colors.success : colors.danger }]}>
          {totalPoints} pts
        </Text>
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onComplete={handleComplete} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 16,
  },
});

export default TaskScreen;
