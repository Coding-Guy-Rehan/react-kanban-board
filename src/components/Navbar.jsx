import React from 'react';
import { Plus, RotateCcw, CheckCircle2, Clock, Layers, Sparkles } from 'lucide-react';

export default function Navbar({ stats, onOpenNewTask, onResetDemo }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Project Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">KanbanFlow</h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  <Sparkles className="w-3 h-3" /> React Project
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Interactive Sprint & Task Management</p>
            </div>
          </div>

          {/* Quick Metrics Bar (Hidden on tiny screens) */}
          <div className="hidden md:flex items-center gap-4 bg-slate-50/80 px-4 py-1.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Total:</span>
              <span className="font-semibold text-slate-800">{stats.total}</span>
            </div>
            <div className="h-3 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5 text-xs text-blue-700">
              <Clock className="w-3.5 h-3.5" />
              <span>In Progress: <strong className="font-semibold">{stats.inProgress}</strong></span>
            </div>
            <div className="h-3 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5 text-xs text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Done: <strong className="font-semibold">{stats.done}</strong></span>
            </div>
            <div className="h-3 w-px bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">{stats.completionRate}%</span>
              <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onResetDemo}
              title="Reset sample data"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-300 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            <button
              onClick={onOpenNewTask}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-all shadow-sm shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
