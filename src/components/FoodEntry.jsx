import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

const FoodEntry = ({ onSave, onCancel, initialSection = 'breakfast' }) => {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    section: initialSection
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.calories) return;
    
    onSave({
      ...formData,
      calories: Number(formData.calories),
      protein: Number(formData.protein) || 0,
      carbs: Number(formData.carbs) || 0,
      fat: Number(formData.fat) || 0,
      id: Date.now()
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sections = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snacks', label: 'Snack' }
  ];

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-950 z-50 animate-in slide-in-from-bottom duration-300">
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 pt-10 sticky top-0 z-10 shadow-md">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <button onClick={onCancel} className="p-1 -ml-1">
            <X size={24} />
          </button>
          <h1 className="text-lg font-bold">Add Food</h1>
          <button onClick={handleSubmit} className="p-1 -mr-1">
            <Save size={24} />
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 space-y-6">
        <div className="space-y-4 bg-gray-50 dark:bg-gray-900 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Food Name</label>
            <input
              type="text"
              autoFocus
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-300"
              placeholder="e.g. Apple, Chicken Salad"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Calories</label>
              <input
                type="number"
                inputMode="numeric"
                value={formData.calories}
                onChange={(e) => handleChange('calories', e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100"
                placeholder="0"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2">Meal Section</label>
              <select
                value={formData.section}
                onChange={(e) => handleChange('section', e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-4 py-[14px] outline-none transition-all shadow-sm appearance-none text-gray-800 dark:text-gray-100"
              >
                {sections.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-gray-50 dark:bg-gray-900 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase ml-1">Macros (optional)</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2 text-center block">Prot</label>
              <input
                type="number"
                inputMode="decimal"
                value={formData.protein}
                onChange={(e) => handleChange('protein', e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-2 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100 text-center"
                placeholder="0g"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2 text-center block">Carbs</label>
              <input
                type="number"
                inputMode="decimal"
                value={formData.carbs}
                onChange={(e) => handleChange('carbs', e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-2 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100 text-center"
                placeholder="0g"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-2 text-center block">Fat</label>
              <input
                type="number"
                inputMode="decimal"
                value={formData.fat}
                onChange={(e) => handleChange('fat', e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 rounded-2xl px-2 py-3 outline-none transition-all shadow-sm text-gray-800 dark:text-gray-100 text-center"
                placeholder="0g"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-blue-100 dark:shadow-none active:scale-[0.98] transition-all text-lg flex items-center justify-center space-x-2"
        >
          <Save size={20} />
          <span>Save to Diary</span>
        </button>
      </form>
    </div>
  );
};

export default FoodEntry;
