import React from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Clock,
  AlertTriangle,
  GripVertical
} from 'lucide-react';
import { PRIORITIES, COLUMNS } from '../types/kanban';

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onMoveTask,
  onDragStart,
  onDragEnd,
  isDragging,
}) {
  const currentColumnIndex = COLUMNS.findIndex((c) => c.id === task.status);
  const prevColumn = currentColumnIndex > 0 ? COLUMNS[currentColumnIndex - 1] : null;
  const nextColumn = currentColumnIndex < COLUMNS.length - 1 ? COLUMNS[currentColumnIndex + 1] : null;

  const priorityMeta = PRIORITIES[task.priority] || PRIORITIES.medium;

  // Check if task is overdue
  const isOverdue = React.useMemo(() => {
    if (!task.dueDate || task.status === 'done') return false;
    const due = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today;
  }, [task.dueDate, task.status]);

  const formattedDate = React.useMemo(() => {
    if (!task.dueDate) return null;
    try {
      const d = new Date(task.dueDate);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return task.dueDate;
    }
  }, [task.dueDate]);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      className={`group relative bg-white rounded-xl border border-slate-200/90 p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-40 scale-95 border-dashed border-indigo-400' : ''
      }`}
    >
      {/* Top Header: Priority Badge + Actions */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5">
          <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${priorityMeta.color}`}
          >
            {priorityMeta.label}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            title="Edit task"
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task);
            }}
            title="Delete task"
            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Task Title */}
      <h4 className="text-sm font-semibold text-slate-900 leading-snug mb-1.5 break-words">
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed break-words">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer Info: Due Date & Column Move Controls */}
      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
        {/* Due date badge */}
        {formattedDate ? (
          <div
            className={`flex items-center gap-1 text-[11px] font-medium ${
              isOverdue
                ? 'text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200'
                : 'text-slate-400'
            }`}
            title={isOverdue ? 'Task is overdue' : `Due on ${task.dueDate}`}
          >
            {isOverdue ? <AlertTriangle className="w-3 h-3 text-rose-500" /> : <Calendar className="w-3 h-3" />}
            <span>{formattedDate}</span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-300">No due date</div>
        )}

        {/* Quick Column Shift Buttons */}
        <div className="flex items-center gap-1">
          {prevColumn && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveTask(task.id, prevColumn.id);
              }}
              title={`Move to ${prevColumn.title}`}
              className="p-1 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}

          {nextColumn && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveTask(task.id, nextColumn.id);
              }}
              title={`Move to ${nextColumn.title}`}
              className="p-1 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
