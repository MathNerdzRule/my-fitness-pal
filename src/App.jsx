import React, { useState, useEffect, useMemo } from 'react';
import { storage, calculateDailyGoal } from './services/storage';
import BottomNav from './components/BottomNav';
import Today from './components/Today';
import Scanner from './components/Scanner';
import Setup from './components/Setup';

// Simple placeholder for Diary and Progress
const Placeholder = ({ title }) => (
  <div className="p-6 flex flex-col items-center justify-center h-[80vh] text-gray-400 italic">
    <h2 className="text-xl font-bold mb-2 text-gray-800 not-italic">{title}</h2>
    Coming soon in the next update!
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [data, setData] = useState(storage.get());
  const [needsSetup, setNeedsSetup] = useState(!localStorage.getItem('lochmara_setup_done'));
  
  const dailyGoal = useMemo(() => calculateDailyGoal(data.user), [data.user]);

  const saveUser = (user) => {
    const updatedData = { ...data, user };
    setData(updatedData);
    storage.save(updatedData);
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
    setActiveTab('today');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return <Today data={data} dailyGoal={dailyGoal} onAddMeal={addMeal} />;
      case 'scan':
        return <Scanner onAddMeal={addMeal} />;
      case 'diary':
        return <Placeholder title="Daily Diary" />;
      case 'progress':
        return <Placeholder title="Weight Progress" />;
      default:
        return <Today data={data} dailyGoal={dailyGoal} onAddMeal={addMeal} />;
    }
  };

  if (needsSetup) {
    return <Setup user={data.user} onSave={saveUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className="max-w-lg mx-auto">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
