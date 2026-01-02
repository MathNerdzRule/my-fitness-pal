import React, { useState, useEffect, useMemo } from 'react';
import { storage, calculateDailyGoal } from './services/storage';
import BottomNav from './components/BottomNav';
import Today from './components/Today';
import Scanner from './components/Scanner';
import Setup from './components/Setup';
import Diary from './components/Diary';
import Progress from './components/Progress';
import More from './components/More';
import FoodEntry from './components/FoodEntry';

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [data, setData] = useState(storage.get());
  const [needsSetup, setNeedsSetup] = useState(!localStorage.getItem('lochmara_setup_done'));
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [mealSection, setMealSection] = useState('breakfast');
  
  const dailyGoal = useMemo(() => calculateDailyGoal(data.user), [data.user]);

  const saveUser = (user) => {
    const updatedData = { ...data, user };
    setData(updatedData);
    storage.updateUser(user);
    localStorage.setItem('lochmara_setup_done', 'true');
    setNeedsSetup(false);
  };

  const addMeal = (meal) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedData = { ...data };
    if (!updatedData.logs[today]) {
      updatedData.logs[today] = { meals: [], exercise: 0 };
    }
    updatedData.logs[today].meals.push(meal);
    setData(updatedData);
    storage.save(updatedData);
    setIsAddingFood(false);
    setActiveTab('today');
  };

  const updateLog = (dateStr, log) => {
    const updatedData = { ...data };
    updatedData.logs[dateStr] = log;
    setData(updatedData);
    storage.save(updatedData);
  };

  const addWeight = (weight) => {
    storage.addWeightLog(weight);
    setData(storage.get());
  };

  const handeAddFoodClick = (section = 'breakfast') => {
    setMealSection(section);
    setIsAddingFood(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return <Today data={data} dailyGoal={dailyGoal} onAddMeal={addMeal} onAddFoodClick={handeAddFoodClick} onUpdateLog={updateLog} />;
      case 'scan':
        return <Scanner onAddMeal={addMeal} onManualEntry={() => setIsAddingFood(true)} />;
      case 'diary':
        return <Diary data={data} onUpdateLog={updateLog} onAddFoodClick={handeAddFoodClick} />;
      case 'progress':
        return <Progress data={data} onAddWeight={addWeight} />;
      case 'more':
        return <More data={data} onEditProfile={() => setNeedsSetup(true)} />;
      default:
        return <Today data={data} dailyGoal={dailyGoal} onAddMeal={addMeal} onAddFoodClick={handeAddFoodClick} />;
    }
  };

  if (needsSetup) {
    return <Setup user={data.user} onSave={saveUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <main className="max-w-lg mx-auto">
        {renderContent()}
      </main>
      
      {isAddingFood && (
        <FoodEntry 
          initialSection={mealSection} 
          onSave={addMeal} 
          onCancel={() => setIsAddingFood(false)} 
        />
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
