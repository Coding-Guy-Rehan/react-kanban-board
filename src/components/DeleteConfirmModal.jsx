import React from 'react';
import { AlertCircle, Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, taskTitle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-sm p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">Delete Task?</h3>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Are you sure you want to remove <span className="font-semibold text-slate-700">"{taskTitle}"</span>? This action cannot be undone.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm shadow-rose-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
