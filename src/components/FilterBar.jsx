import React from 'react';
import { Search, X, Filter, Tag } from 'lucide-react';
import { PRIORITIES, AVAILABLE_TAGS } from '../types/kanban';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedPriority,
  onPriorityChange,
  selectedTag,
  onTagChange,
  totalMatching,
  totalTasks,
  onClearFilters,
}) {
  const isFiltering = searchQuery.trim() !== '' || selectedPriority !== 'all' || selectedTag !== 'all';

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks, descriptions, or tags..."
            className="w-full pl-9 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Priority Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Priority:
          </span>
          <button
            onClick={() => onPriorityChange('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedPriority === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {Object.entries(PRIORITIES).map(([key, item]) => {
            const isSelected = selectedPriority === key;
            return (
              <button
                key={key}
                onClick={() => onPriorityChange(key)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap capitalize ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Tag Filter Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedTag}
              onChange={(e) => onTagChange(e.target.value)}
              className="pl-8 pr-8 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer appearance-none"
            >
              <option value="all">All Tags</option>
              {AVAILABLE_TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {isFiltering && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

      </div>

      {/* Filter status strip */}
      {isFiltering && (
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong className="font-semibold text-slate-800">{totalMatching}</strong> of {totalTasks} tasks
          </span>
          <span className="text-indigo-600 font-medium">Filters active</span>
        </div>
      )}
    </div>
  );
}
