import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../redux/taskslice';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const TaskFormScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const editingTask = route.params?.task;

  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [dueDate, setDueDate] = useState(
    editingTask?.dueDate ? new Date(editingTask.dueDate) : new Date()
  );
  const [priority, setPriority] = useState(editingTask?.priority || 'low');
  const [showPicker, setShowPicker] = useState(false);

  const isFormValid = () =>
    title.trim() !== '' && description.trim() !== '' && dueDate && priority;

  const handleSave = () => {
    if (!isFormValid()) {
      Alert.alert('Missing Fields', 'Please fill out all fields before saving.');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.toISOString(),
      priority,
      completed: editingTask?.completed || false,
    };

    editingTask
      ? dispatch(updateTask({ id: editingTask.id, updatedData: taskData }))
      : dispatch(addTask(taskData));

    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.header}>{editingTask ? 'Edit Task' : 'Add New Task'}</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Enter task details"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Due Date</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePicker}>
        <Text style={styles.dateText}>{dueDate.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Priority</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={priority}
          onValueChange={setPriority}
          style={styles.picker}
          dropdownIconColor="#6C63FF"
        >
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
        </Picker>
      </View>

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveText}>{editingTask ? 'Update Task' : 'Save Task'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#f9fafe',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 60,
    marginBottom: 30,
    textAlign: 'center',
    color: '#2C3E50',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  description: {
    height: 110,
    textAlignVertical: 'top',
  },
  datePicker: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    elevation: 1,
  },
  dateText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  pickerWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 1,
  },
  picker: {
    height: 50,
    color: '#2C3E50',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#6C63FF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TaskFormScreen;
