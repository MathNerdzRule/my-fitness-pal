import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Utensils, Trash2 } from 'lucide-react';

const Diary = ({ data, onUpdateLog, onAddFoodClick }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const changeDate = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const log = data.logs[selectedDate] || { meals: [], exercise: 0 };
  const mealSections = [
    { id: 'breakfast', title: 'Breakfast' },
    { id: 'lunch', title: 'Lunch' },
    { id: 'dinner', title: 'Dinner' },
    { id: 'snacks', title: 'Snacks' },
  ];

  const deleteMeal = (id) => {
    const updatedMeals = log.meals.filter(m => m.id !== id);
    onUpdateLog(selectedDate, { ...log, meals: updatedMeals });
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
        {mealSections.map((section) => {
          const sectionMeals = log.meals.filter(m => m.section === section.id || (!m.section && section.id === 'breakfast' && log.meals.indexOf(m) < 4)); // Fallback logic
          const sectionCals = sectionMeals.reduce((sum, m) => sum + m.calories, 0);

          return (
            <div key={section.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">{section.title}</h3>
                <span className="text-xs font-bold text-gray-400">{sectionCals} cal</span>
              </div>
              
              <div className="divide-y divide-gray-50 dark:divide-gray-800">
                {sectionMeals.map((meal) => (
                  <div key={meal.id} className="p-4 flex justify-between items-center group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Utensils size={16} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-100">{meal.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">
                          {meal.calories} cal • {meal.protein}g P • {meal.carbs}g C • {meal.fat}g F
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteMeal(meal.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                
                <button 
                  onClick={() => onAddFoodClick(section.id)}
                  className="w-full text-left px-4 py-3 flex items-center space-x-2 text-blue-500 font-bold text-xs uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:bg-gray-100"
                >
                  <Plus size={16} />
                  <span>Add Food</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Exercise Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-green-600 dark:text-green-400 text-sm">Exercise</h3>
            <span className="text-xs font-bold text-gray-400">{log.exercise || 0} cal</span>
          </div>
          <button className="w-full text-left px-4 py-3 flex items-center space-x-2 text-green-500 font-bold text-xs uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Plus size={16} />
            <span>Add Exercise</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diary;
