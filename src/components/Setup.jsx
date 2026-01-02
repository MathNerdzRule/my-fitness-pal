import React, { useState } from 'react';

const Setup = ({ user, onSave }) => {
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-white dark:bg-gray-950">
      <header className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
           <span className="text-white text-3xl font-black italic">M</span>
        </div>
        <h1 className="text-3xl font-black text-blue-600 dark:text-blue-400 italic tracking-tighter uppercase">MyFitnessPal</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium italic">Your personal calorie companion</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 bg-gray-50 dark:bg-gray-900 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 px-1">Your Stats</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100"
                placeholder="Years"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-2 outline-none transition-all shadow-sm appearance-none text-gray-800 dark:text-gray-100"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Weight (lbs)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Height (ft)</label>
              <input
                type="number"
                value={formData.heightFeet}
                onChange={(e) => setFormData({ ...formData, heightFeet: Number(e.target.value) })}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Height (in)</label>
              <input
                type="number"
                value={formData.heightInches}
                onChange={(e) => setFormData({ ...formData, heightInches: Number(e.target.value) })}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-blue-100 active:scale-[0.98] transition-all text-lg"
        >
          Save & Start Tracking
        </button>
      </form>
    </div>
  );
};

export default Setup;
