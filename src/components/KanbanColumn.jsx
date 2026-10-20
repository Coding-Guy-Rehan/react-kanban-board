import React, { useState } from 'react';
import { Plus, Inbox } from 'lucide-react';
import TaskCard from './TaskCard';

export default function KanbanColumn({
  column,
  tasks,
  onOpenNewTaskForColumn,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  draggedTaskId,
  onDragStart,
  onDragEnd,
  onDropTask,
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    // Only toggle if leaving the column element itself
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    onDropTask(column.id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col bg-slate-100/80 rounded-2xl p-3.5 border-2 transition-all min-h-[500px] ${
        isDragOver
          ? 'border-indigo-400 bg-indigo-50/40 ring-2 ring-indigo-200/50'
          : 'border-transparent'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/70">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${column.badge.split(' ')[0]}`} />
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">
            {column.title}
          </h3>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white text-slate-600 border border-slate-200/80 shadow-2xs">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onOpenNewTaskForColumn(column.id)}
          title={`Add task to ${column.title}`}
          className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white transition-all shadow-2xs"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Task List / Drop Area */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-0.5">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isDragging={draggedTaskId === task.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onMoveTask={onMoveTask}
          />
        ))}

        {/* Empty column state */}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-xl text-center p-4">
            <Inbox className="w-8 h-8 text-slate-300 mb-2" />
            <p className="text-xs font-medium text-slate-400">No tasks in {column.title}</p>
            <button
              onClick={() => onOpenNewTaskForColumn(column.id)}
              className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              + Add a task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
