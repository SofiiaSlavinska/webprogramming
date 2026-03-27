import type { Task, Bug } from './types';

// Функція пошуку
export const filterTasks = (tasks: Task[], query: string): Task[] => {
  const lowerQuery = query.toLowerCase();
  return tasks.filter(task => task.title.toLowerCase().includes(lowerQuery));
};

// Type Guard: перевіряє, чи є завдання критичним багом
export const isHighPriorityBug = (task: Task): task is Bug => {
  return task.type === 'bug' && task.severity === 'critical';
};