import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { Plus, Utensils, Trash2 } from 'lucide-react';

const Today = ({ data, dailyGoal, onAddFoodClick, onUpdateLog }) => {
  const today = new Date().toISOString().split('T')[0];
  const log = data.logs[today] || { meals: [], exercise: 0 };
  
  const totalConsumed = log.meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalExercise = log.exercise || 0;
  const remaining = dailyGoal - totalConsumed + totalExercise;

  const mealSections = [
    { id: 'breakfast', title: 'Breakfast' },
    { id: 'lunch', title: 'Lunch' },
    { id: 'dinner', title: 'Dinner' },
    { id: 'snacks', title: 'Snacks' },
  ];

  const deleteMeal = (id) => {
    const updatedMeals = log.meals.filter(m => m.id !== id);
    onUpdateLog(today, { ...log, meals: updatedMeals });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pb-24">
      {/* Top Header */}
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 pt-10 sticky top-0 z-10 shadow-md">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <h1 className="text-xl font-bold lowercase tracking-tight">myfitnesspal</h1>
          <div className="flex items-center space-x-3">
             <ThemeSwitcher />
             <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center font-black text-sm border-2 border-blue-400 shadow-inner">
                {data.user.name ? data.user.name[0].toUpperCase() : 'U'}
             </div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-3 space-y-4">
        {/* Calories Summary Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
           <div className="flex justify-between items-center mb-4">
              <div className="text-center flex-1 border-r border-gray-100 dark:border-gray-800">
                 <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{dailyGoal}</p>
                 <p className="text-[10px] text-gray-400 uppercase font-bold">Goal</p>
              </div>
              <div className="text-center px-4 font-bold text-gray-300">-</div>
              <div className="text-center flex-1 border-r border-gray-100 dark:border-gray-800">
                 <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalConsumed}</p>
                 <p className="text-[10px] text-gray-400 uppercase font-bold">Food</p>
              </div>
              <div className="text-center px-4 font-bold text-gray-300">+</div>
              <div className="text-center flex-1 border-r border-gray-100 dark:border-gray-800">
                 <p className="text-2xl font-bold text-green-500">{totalExercise}</p>
                 <p className="text-[10px] text-gray-400 uppercase font-bold">Exercise</p>
              </div>
              <div className="text-center px-4 font-bold text-gray-300">=</div>
              <div className="text-center flex-1">
                 <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>{remaining}</p>
                 <p className="text-[10px] text-gray-400 uppercase font-bold">Remaining</p>
              </div>
           </div>
           
           <div className="relative h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500" 
                style={{ width: `${Math.min((totalConsumed / dailyGoal) * 100, 100)}%` }}
              />
           </div>
        </div>

        {/* Meal Sections */}
        {mealSections.map((section) => {
          const sectionMeals = log.meals.filter(m => m.section === section.id);
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
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
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
                  className="w-full text-left px-4 py-3 flex items-center space-x-2 text-blue-500 font-bold text-xs uppercase tracking-wider active:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Food</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Today;
