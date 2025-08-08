import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useThemeColors } from '../../constants/theme';
import { UserTask } from '../../app/models/UserTask';
import TaskCard from '../../components/TaskCard';
import CreateTaskModal from '../../components/createTaskModal';
import { TaskType, VerificationType } from '../../app/models/TaskTemplate';

const TaskScreen = () => {
  const colors = useThemeColors();

  // Example seed tasks
  const [tasks, setTasks] = useState<UserTask[]>([
    {
      id: '1',
      title: 'Go to the gym',
      type: 'daily',
      verification: 'none',
      pointsPerCompletion: 5,
      originalTaskId: '1',
      source: 'personal',
      lastCompleted: undefined,
      completionsToday: 0,
    },
    {
      id: '2',
      title: 'Drink water',
      type: 'repeatable',
      verification: 'none',
      pointsPerCompletion: 1,
      originalTaskId: '2',
      source: 'personal',
      completionsToday: 0,
    },
  ]);

  const [totalPoints, setTotalPoints] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCompleteTask = (updatedTask: UserTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTotalPoints((prev) => prev + updatedTask.pointsPerCompletion);
  };

  const handleCreateTask = (data: {
    title: string;
    type: TaskType;
    pointsPerCompletion: number;
    verificationRequired: boolean;
  }) => {
    const newTask: UserTask = {
      id: Math.random().toString(),
      title: data.title,
      type: data.type,
      verification: data.verificationRequired ? 'photo' : 'none',
      pointsPerCompletion: data.pointsPerCompletion,
      originalTaskId: Math.random().toString(),
      source: 'personal',
      completionsToday: 0,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Points Counter */}
      <Text
        style={[
          styles.pointsCounter,
          { color: totalPoints >= 0 ? colors.success : colors.danger },
        ]}
      >
        {totalPoints >= 0 ? '+' : ''}
        {totalPoints} pts
      </Text>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onComplete={handleCompleteTask} />
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: colors.success }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: colors.background, fontWeight: '600', fontSize: 16 }}>
              + Create Task
            </Text>
          </TouchableOpacity>
        }
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Create Task Modal */}
      <CreateTaskModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreateTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pointsCounter: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  createButton: {
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
  },
});

export default TaskScreen;
