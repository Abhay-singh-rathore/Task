import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../redux/taskslice';

// Helper: Get week number of the year
const getWeekNumber = (date) => {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((((date - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list: tasks = [], loading } = useSelector(state => state.tasks || {});

  const [activeTab, setActiveTab] = useState('home');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('time');
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks
    .filter(task => {
      const matchStatus =
        filterStatus === 'all' ||
        (filterStatus === 'completed' && task.completed) ||
        (filterStatus === 'uncompleted' && !task.completed);
      const matchTitle = task.title.toLowerCase().includes(searchText.toLowerCase());
      return matchStatus && matchTitle;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const p = { low: 3, medium: 2, high: 1 };
        return p[a.priority] - p[b.priority];
      }
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  const today = new Date();
  const thisWeek = getWeekNumber(today);
  const thisMonth = today.getMonth();

  const groupedTasks = {
    Today: [],
    Tomorrow: [],
    'This Week': [],
    'This Month': [],
  };

  filteredTasks.forEach(task => {
    const dueDate = new Date(task.dueDate);
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (dueDate.toDateString() === today.toDateString()) {
      groupedTasks.Today.push(task);
    } else if (diffDays === 1) {
      groupedTasks.Tomorrow.push(task);
    }

    const taskWeek = getWeekNumber(dueDate);
    const taskMonth = dueDate.getMonth();

    if (taskWeek === thisWeek) {
      groupedTasks['This Week'].push(task);
    }

    if (taskMonth === thisMonth) {
      groupedTasks['This Month'].push(task);
    }
  });

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.taskItem,
        item.completed && { opacity: 0.5, backgroundColor: '#e0e0e0' },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.title,
            item.completed && { textDecorationLine: 'line-through', color: '#666' },
          ]}
        >
          {item.title}
        </Text>
        <Text style={styles.subtitle}>{item.description}</Text>
        <Text style={styles.date}>
          {new Date(item.dueDate).toDateString()} • {item.priority.toUpperCase()}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          dispatch(updateTask({ id: item.id, updatedData: { completed: !item.completed } }))
        }
      >
        <Icon
          name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color="#6C63FF"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TaskFormScreen', { task: item })}>
        <Icon name="create-outline" size={24} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(deleteTask(item.id))}>
        <Icon name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const renderSection = () => {
    const sectionTypes = activeTab === 'calendar'
      ? ['This Week', 'This Month']
      : ['Today', 'Tomorrow'];

    return (
      <ScrollView style={styles.middleSection}>
        {sectionTypes.map(section =>
          groupedTasks[section]?.length > 0 ? (
            <View key={section}>
              <Text style={styles.sectionTitle}>{section}</Text>
              <FlatList
                data={groupedTasks[section]}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
          ) : (
            <View key={section} style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>{section}</Text>
              <Text style={{ color: '#aaa', marginLeft: 10 }}>No tasks.</Text>
            </View>
          )
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.dateText}>{new Date().toDateString()}</Text>
          <View style={styles.topRight}>
            <TouchableOpacity onPress={() => setSortBy(sortBy === 'time' ? 'priority' : 'time')}>
              <Text style={styles.sortBtn}>Sort: {sortBy === 'time' ? 'Time' : 'Priority'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
              <Icon name="search-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        {showSearch && (
          <TextInput
            placeholder="Search by title..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#ddd"
          />
        )}
      </View>

      {/* Filter Row */}
      <View style={styles.filterRow}>
        {['all', 'completed', 'uncompleted'].map(status => (
          <TouchableOpacity key={status} onPress={() => setFilterStatus(status)}>
            <Text style={filterStatus === status ? styles.activeFilter : styles.filter}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task Sections */}
      {loading ? <ActivityIndicator size="large" color="#6C63FF" /> : renderSection()}

      {/* Bottom Navigation */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity onPress={() => setActiveTab('home')}>
          <Icon name="home" size={28} color={activeTab === 'home' ? '#6C63FF' : '#999'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TaskFormScreen')}>
          <View style={styles.addButton}>
            <Text style={styles.addText}>＋</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('calendar')}>
          <Icon name="calendar" size={28} color={activeTab === 'calendar' ? '#6C63FF' : '#999'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topSection: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dateText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sortBtn: {
    color: '#fff',
    marginRight: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  searchInput: {
     backgroundColor: '#f3f2ff', // or use 'transparent' if you have gradient background
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 20,
  marginTop: 10,
  color: '#333',
  fontSize: 16,
  borderWidth: 1,
  borderColor: '#d1c4e9',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  filter: { color: '#888', fontSize: 14 },
  activeFilter: { fontWeight: 'bold', color: '#6C63FF' },
  middleSection: { flex: 1, paddingHorizontal: 16, backgroundColor: '#fff' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 4,
    color: '#6C63FF',
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: 'center',
    gap: 10,
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  subtitle: { fontSize: 14 },
  date: { fontSize: 12, color: '#666' },
  addButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: { fontSize: 30, color: '#fff' },
  bottomTabs: {
     flexDirection: 'row',
  height: 90,
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: '#f3f2ff',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -3 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 14,
  },
});

export default HomeScreen;
