import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Modal from 'react-native-modal';
import { useThemeColors } from '../constants/theme';
import { TaskType } from '../app/models/TaskTemplate';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onCreate: (taskData: {
    title: string;
    type: TaskType;
    pointsPerCompletion: number;
    verificationRequired: boolean;
  }) => void;
};

const CreateTaskModal = ({ isVisible, onClose, onCreate }: Props) => {
  const colors = useThemeColors();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TaskType>('daily');
  const [points, setPoints] = useState(1);
  const [isNegative, setIsNegative] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState(false);

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate({
      title,
      type,
      pointsPerCompletion: isNegative ? -Math.abs(points) : Math.abs(points),
      verificationRequired,
    });
    setTitle('');
    setPoints(1);
    setIsNegative(false);
    setType('daily');
    setVerificationRequired(false);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      propagateSwipe
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.handle} />

        <Text style={[styles.label, { color: colors.text }]}>Task Name</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.text }]}
          placeholder="Enter task name"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={[styles.label, { color: colors.text }]}>Task Type</Text>
        <View style={styles.typeRow}>
          {['daily', 'repeatable', 'oneTime'].map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.typeButton,
                type === t && { backgroundColor: colors.success },
              ]}
              onPress={() => setType(t as TaskType)}
            >
              <Text
                style={{
                  color: type === t ? colors.background : colors.text,
                  fontWeight: '600',
                }}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Points</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.text }]}
          keyboardType="numeric"
          value={points.toString()}
          onChangeText={(val) => setPoints(Number(val) || 0)}
        />

        <View style={styles.switchRow}>
          <Text style={{ color: colors.text }}>Negative Points?</Text>
          <Switch value={isNegative} onValueChange={setIsNegative} />
        </View>

        <View style={styles.switchRow}>
          <Text style={{ color: colors.text }}>Requires Verification?</Text>
          <Switch value={verificationRequired} onValueChange={setVerificationRequired} />
        </View>

        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: colors.success }]}
          onPress={handleCreate}
        >
          <Text style={{ color: colors.background, fontWeight: '600', fontSize: 16 }}>
            Create Task
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    height: '95%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#666',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
  },
  typeRow: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  createButton: {
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default CreateTaskModal;
