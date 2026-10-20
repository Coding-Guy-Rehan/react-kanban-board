import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';

export default function KanbanBoard({
  columns,
  tasks,
  onOpenNewTaskForColumn,
  onEditTask,
  onDeleteTask,
  onMoveTask,
}) {
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  const handleDropTask = (columnId) => {
    if (draggedTaskId) {
      onMoveTask(draggedTaskId, columnId);
      setDraggedTaskId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 pb-8">
      {columns.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.id);

        return (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={columnTasks}
            onOpenNewTaskForColumn={onOpenNewTaskForColumn}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onMoveTask={onMoveTask}
            draggedTaskId={draggedTaskId}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDropTask={handleDropTask}
          />
        );
      })}
    </div>
  );
}
