// src/redux/slices/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const userId = auth().currentUser.uid;
  const snapshot = await firestore()
    .collection('users')
    .doc(userId)
    .collection('tasks')
    .orderBy('dueDate', 'asc')
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addTask = createAsyncThunk('tasks/add', async (task) => {
  const userId = auth().currentUser.uid;
  const ref = await firestore()
    .collection('users')
    .doc(userId)
    .collection('tasks')
    .add(task);
  return { id: ref.id, ...task };
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, updatedData }) => {
  const userId = auth().currentUser.uid;
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('tasks')
    .doc(id)
    .update(updatedData);
  return { id, updatedData };
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id) => {
  const userId = auth().currentUser.uid;
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('tasks')
    .doc(id)
    .delete();
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.list.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload.updatedData };
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter(t => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
