import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TaskList = ({ tasks, navigation }) => {
  if (tasks.length === 0) {
    return <Text style={{ color: '#aaa' }}>No tasks</Text>;
  }

  return tasks.map(task => (
    <View key={task.id} style={styles.task}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.desc}>{task.description}</Text>
        <Text style={styles.meta}>{new Date(task.dueDate).toDateString()} • {task.priority}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('TaskFormScreen', { task })}>
        <Icon name="create-outline" size={20} color="orange" />
      </TouchableOpacity>
    </View>
  ));
};

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: 'center',
    gap: 10,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  desc: { fontSize: 14 },
  meta: { fontSize: 12, color: '#666' },
});

export default TaskList;
