import React, { useState } from 'react';

const Setup = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    ...user,
    // Convert to strings for easier input handling
    age: user.age.toString(),
    weight: user.weight.toString(),
    heightFeet: user.heightFeet.toString(),
    heightInches: user.heightInches.toString(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert back to numbers on save
    onSave({
      ...formData,
      age: Number(formData.age) || 0,
      weight: Number(formData.weight) || 0,
      heightFeet: Number(formData.heightFeet) || 0,
      heightInches: Number(formData.heightInches) || 0,
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 px-1">Profile Info</h2>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Your Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100"
              placeholder="Enter your name"
            />
          </div>

          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 px-1 pt-2">Your Stats</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Age</label>
              <input
                type="number"
                inputMode="numeric"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100"
                placeholder="Years"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-[14px] outline-none transition-all shadow-sm appearance-none text-gray-800 dark:text-gray-100"
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
              inputMode="decimal"
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Height (ft)</label>
              <input
                type="number"
                inputMode="numeric"
                value={formData.heightFeet}
                onChange={(e) => handleChange('heightFeet', e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Height (in)</label>
              <input
                type="number"
                inputMode="numeric"
                value={formData.heightInches}
                onChange={(e) => handleChange('heightInches', e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-blue-100 dark:shadow-none active:scale-[0.98] transition-all text-lg"
        >
          Save & Start Tracking
        </button>
      </form>
    </div>
  );
};

export default Setup;
