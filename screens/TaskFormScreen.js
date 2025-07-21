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
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ? new Date(editingTask.dueDate) : new Date());
  const [priority, setPriority] = useState(editingTask?.priority || 'low');
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    if (!title.trim() || !description.trim() || !dueDate || !priority) {
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

    if (editingTask) {
      dispatch(updateTask({ id: editingTask.id, updatedData: taskData }));
    } else {
      dispatch(addTask(taskData));
    }

    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Priority</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
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
    backgroundColor: '#f7f8fa',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    paddingTop: 90,
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePicker: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  pickerWrapper: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 24,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TaskFormScreen;
