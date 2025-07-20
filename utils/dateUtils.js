import moment from 'moment';

export const getTaskCategory = (dueDate) => {
  const now = moment();
  const taskDate = moment(dueDate);

  if (taskDate.isSame(now, 'day')) return 'Today';
  if (taskDate.isSame(now.clone().add(1, 'day'), 'day')) return 'Tomorrow';
  if (taskDate.isBefore(now.clone().add(7, 'day'))) return 'This Week';
  return 'This Month';
};
