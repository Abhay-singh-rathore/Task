import firestore from '@react-native-firebase/firestore';

export const getTasksForUser = async (uid) => {
  const snapshot = await firestore()
    .collection('tasks')
    .where('userId', '==', uid)
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateTaskStatus = (id, completed) =>
  firestore().collection('tasks').doc(id).update({ completed });

export const deleteTask = (id) =>
  firestore().collection('tasks').doc(id).delete();
