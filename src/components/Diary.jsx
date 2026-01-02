import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Dumbbell, StickyNote } from 'lucide-react';

const Diary = ({ data, onUpdateLog }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const changeDate = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const log = data.logs[selectedDate] || { meals: [], exercise: 0, notes: '' };

  const handleNotesChange = (e) => {
    onUpdateLog(selectedDate, { ...log, notes: e.target.value });
  };

  const handleAddExercise = () => {
    const amount = prompt("Enter calories burned from exercise:", "0");
    if (amount !== null && !isNaN(amount)) {
      onUpdateLog(selectedDate, { ...log, exercise: (Number(log.exercise) || 0) + Number(amount) });
    }
  };

  const formatDisplayDate = (dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    const d = new Date(dateStr);
    if (dateStr === today) return 'Today';
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pb-24">
      {/* Date Header */}
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 pt-10 sticky top-0 z-10 shadow-md">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <button onClick={() => changeDate(-1)} className="p-1"><ChevronLeft /></button>
          <h1 className="text-lg font-bold">{formatDisplayDate(selectedDate)}</h1>
          <button onClick={() => changeDate(1)} className="p-1"><ChevronRight /></button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-3 space-y-4">
        {/* Exercise Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <Dumbbell size={16} className="text-green-600" />
              <h3 className="font-bold text-green-600 dark:text-green-400 text-sm">Exercise</h3>
            </div>
            <span className="text-xs font-bold text-gray-400">{log.exercise || 0} cal</span>
          </div>
          <button 
            onClick={handleAddExercise}
            className="w-full text-left px-4 py-3 flex items-center space-x-2 text-green-500 font-bold text-xs uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:bg-gray-100"
          >
            <Plus size={16} />
            <span>Add Exercise</span>
          </button>
        </div>

        {/* Notes Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="bg-amber-50 dark:bg-amber-900/20 px-4 py-2 flex items-center space-x-2 border-b border-gray-100 dark:border-gray-800">
            <StickyNote size={16} className="text-amber-600" />
            <h3 className="font-bold text-amber-600 dark:text-amber-400 text-sm">Daily Notes</h3>
          </div>
          <div className="p-4">
            <textarea
              value={log.notes || ''}
              onChange={handleNotesChange}
              placeholder="How was your day? Any reasons for straying from the plan? Mood, occurrences, etc."
              className="w-full min-h-[150px] bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-amber-400 rounded-xl p-4 outline-none transition-all text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 resize-none shadow-inner"
            />
          </div>
        </div>

        {/* Info Card */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium leading-relaxed italic">
            "Use this space to reflect on your progress. Tracking your mood and circumstances helps identify patterns and triggers."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Diary;
