import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { useKanban } from './hooks/useKanban';
import { COLUMNS } from './types/kanban';
import { Sparkles, Info, Github } from 'lucide-react';

export default function App() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    resetToDefault,
    stats,
  } = useKanban();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalDefaultStatus, setModalDefaultStatus] = useState('todo');
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Compute filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description?.toLowerCase().includes(query);
        const matchesTag = task.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTag) return false;
      }

      // 2. Priority filter
      if (selectedPriority !== 'all' && task.priority !== selectedPriority) {
        return false;
      }

      // 3. Tag filter
      if (selectedTag !== 'all' && (!task.tags || !task.tags.includes(selectedTag))) {
        return false;
      }

      return true;
    });
  }, [tasks, searchQuery, selectedPriority, selectedTag]);

  // Handlers
  const handleOpenNewTask = (defaultStatus = 'todo') => {
    setEditingTask(null);
    setModalDefaultStatus(defaultStatus);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedPriority('all');
    setSelectedTag('all');
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Sticky Top Navbar */}
      <Navbar
        stats={stats}
        onOpenNewTask={() => handleOpenNewTask('todo')}
        onResetDemo={resetToDefault}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Banner with tips */}
        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent border border-indigo-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <p>
              <strong className="font-semibold text-slate-900">Interactive Features:</strong>{' '}
              Drag & drop cards across stages, use left/right arrow buttons for 1-click moves, or filter by tags & priorities.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] shrink-0">
            <Info className="w-3.5 h-3.5 text-indigo-500" />
            <span>Changes auto-save to browser LocalStorage</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          totalMatching={filteredTasks.length}
          totalTasks={tasks.length}
          onClearFilters={handleClearFilters}
        />

        {/* Kanban Board Grid */}
        <KanbanBoard
          columns={COLUMNS}
          tasks={filteredTasks}
          onOpenNewTaskForColumn={(colId) => handleOpenNewTask(colId)}
          onEditTask={handleEditTask}
          onDeleteTask={(task) => setTaskToDelete(task)}
          onMoveTask={moveTask}
        />

      </main>

      {/* Modals */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        initialData={editingTask}
        defaultStatus={modalDefaultStatus}
      />

      <DeleteConfirmModal
        isOpen={Boolean(taskToDelete)}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title || ''}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 KanbanFlow — React Portfolio Project built with React 18, Tailwind CSS & Vite.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              LocalStorage Enabled
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
