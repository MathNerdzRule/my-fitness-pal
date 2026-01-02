const STORAGE_KEY = 'lochmara_data';

const defaultData = {
  user: {
    name: 'User',
    age: 18,
    weight: 150, // lbs
    heightFeet: 5,
    heightInches: 7,
    gender: 'female',
    activityLevel: 1.2, // Sedentary
    goal: 'maintain',
  },
  logs: {}, // { '2023-10-27': { meals: [], exercise: 0 } }
  weightHistory: [], // [{ date: '2023-10-27', weight: 150 }]
};

export const storage = {
  get: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : defaultData;
    // Migration: ensure weightHistory exists
    if (!parsed.weightHistory) parsed.weightHistory = [];
    return parsed;
  },
  save: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  getLogForDate: (dateStr) => {
    const data = storage.get();
    return data.logs[dateStr] || { meals: [], exercise: 0 };
  },
  saveLogForDate: (dateStr, log) => {
    const data = storage.get();
    data.logs[dateStr] = log;
    storage.save(data);
  },
  updateUser: (user) => {
    const data = storage.get();
    data.user = { ...data.user, ...user };
    
    // Log weight change to history
    const today = new Date().toISOString().split('T')[0];
    const lastLog = data.weightHistory[data.weightHistory.length - 1];
    if (!lastLog || lastLog.date !== today || lastLog.weight !== user.weight) {
      data.weightHistory.push({ date: today, weight: user.weight });
    }
    
    storage.save(data);
  },
  addWeightLog: (weight) => {
    const data = storage.get();
    const today = new Date().toISOString().split('T')[0];
    data.weightHistory.push({ date: today, weight });
    data.user.weight = weight;
    storage.save(data);
  }
};

export const calculateDailyGoal = (user) => {
  const weightKg = user.weight / 2.22046; // More precise
  const heightCm = ((user.heightFeet * 12) + user.heightInches) * 2.54;
  
  const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * user.age) + (user.gender === 'female' ? -161 : 5);
  return Math.round(bmr * user.activityLevel);
};
