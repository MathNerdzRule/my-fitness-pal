import React from 'react';
import CalorieRing from './CalorieRing';
import ThemeSwitcher from './ThemeSwitcher';
import { Plus, Flame, Utensils, Apple } from 'lucide-react';


const Today = ({ data, dailyGoal, onAddMeal }) => {
  const today = new Date().toISOString().split('T')[0];
  const log = data.logs[today] || { meals: [], exercise: 0 };
  
  const totalConsumed = log.meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalExercise = log.exercise || 0;

  return (
    <div className="p-6 pb-24 space-y-8 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Hello, {data.user.name}!</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Ready to hit your goals today?</p>
        </div>
        <div className="flex items-center space-x-3">
          <ThemeSwitcher />
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold border-2 border-white dark:border-gray-800 shadow-sm text-lg">
            {data.user.name[0]}
          </div>
        </div>
      </header>

      <CalorieRing goal={dailyGoal} consumed={totalConsumed} exercise={totalExercise} />

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Recent Meals</h2>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold">View All</button>
        </div>

        {log.meals.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 italic text-gray-400 dark:text-gray-500">
            No meals logged today yet.
          </div>
        ) : (
          <div className="space-y-3">
            {log.meals.slice(-3).reverse().map((meal, i) => (
              <div key={meal.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-50 dark:border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Utensils size={18} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{meal.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{meal.protein}g P • {meal.carbs}g C • {meal.fat}g F</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 dark:text-gray-100">{meal.calories}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-tighter">kcal</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="grid grid-cols-2 gap-4">
        <button className="p-5 bg-blue-600 rounded-[2rem] text-white flex flex-col items-center justify-center space-y-2 shadow-lg shadow-blue-100 active:scale-95 transition-transform">
          <Plus size={24} />
          <span className="font-bold text-sm text-[12px]">Add Food</span>
        </button>
        <button className="p-5 bg-green-500 rounded-[2rem] text-white flex flex-col items-center justify-center space-y-2 shadow-lg shadow-green-100 active:scale-95 transition-transform">
          <Flame size={24} />
          <span className="font-bold text-sm text-[12px]">Add Exercise</span>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Today;
