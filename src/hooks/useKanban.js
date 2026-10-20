import { useState, useEffect, useMemo } from 'react';
import { INITIAL_TASKS } from '../types/kanban';

const STORAGE_KEY = 'kanban_board_tasks_v1';

export function useKanban() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage:', e);
    }
    return INITIAL_TASKS;
  });

  // Sync to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage:', e);
    }
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      tags: taskData.tags || [],
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (taskId, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updatedFields } : t))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const moveTask = (taskId, targetStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t))
    );
  };

  const resetToDefault = () => {
    setTasks(INITIAL_TASKS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    } catch (e) {
      console.error(e);
    }
  };

  // Derived statistics for dashboard header
  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === 'todo').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const review = tasks.filter((t) => t.status === 'review').length;
    const done = tasks.filter((t) => t.status === 'done').length;
    const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

    return {
      total,
      todo,
      inProgress,
      review,
      done,
      completionRate,
    };
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    resetToDefault,
    stats,
  };
}
