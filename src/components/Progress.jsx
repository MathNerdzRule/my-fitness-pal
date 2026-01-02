import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Plus, History } from 'lucide-react';

const Progress = ({ data, onAddWeight }) => {
  const [newWeight, setNewWeight] = useState('');
  const history = [...data.weightHistory].reverse();
  const currentWeight = data.user.weight;
  const startWeight = data.weightHistory[0]?.weight || currentWeight;
  const netChange = currentWeight - startWeight;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newWeight && !isNaN(newWeight)) {
      onAddWeight(Number(newWeight));
      setNewWeight('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pb-24">
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 pt-10 sticky top-0 z-10 shadow-md">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold">Progress</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-3 space-y-4">
        {/* Weight Summary Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex justify-between items-center">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Current Weight</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-gray-800 dark:text-gray-100">{currentWeight}</span>
              <span className="text-sm font-bold text-gray-400">lbs</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Weight Change</p>
            <div className={`flex items-center justify-end font-bold ${netChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {netChange <= 0 ? <TrendingDown size={20} className="mr-1" /> : <TrendingUp size={20} className="mr-1" />}
              <span className="text-2xl">{netChange > 0 ? '+' : ''}{netChange.toFixed(1)}</span>
              <span className="text-xs ml-1 font-bold">lbs</span>
            </div>
          </div>
        </div>

        {/* Add Weight Input */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Log New Weight</label>
          <div className="flex space-x-2 mt-2">
            <input
              type="number"
              step="0.1"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              placeholder="Enter weight in lbs"
              className="flex-1 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 rounded-xl px-4 py-2 outline-none transition-all text-gray-800 dark:text-gray-100"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-xl shadow-lg shadow-blue-100 dark:shadow-none active:scale-95 transition-transform"
            >
              <Plus size={24} />
            </button>
          </div>
        </form>

        {/* History List */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-gray-100 dark:border-gray-700">
            <History size={16} className="text-gray-400" />
            <h3 className="font-bold text-gray-700 dark:text-gray-300 text-sm">Recent Entries</h3>
          </div>
          
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {history.length === 0 ? (
              <div className="p-8 text-center text-gray-400 italic text-sm">No entries yet. Start logging!</div>
            ) : (
              history.map((entry, idx) => (
                <div key={idx} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-100">{entry.weight} lbs</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  {idx < history.length - 1 && (
                    <div className={`text-xs font-bold ${(entry.weight - history[idx+1].weight) <= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {(entry.weight - history[idx+1].weight) > 0 ? '+' : ''}{(entry.weight - history[idx+1].weight).toFixed(1)}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
