const STORAGE_KEY = 'lochmara_data';

const defaultData = {
  user: {
    name: 'User',
    age: 30,
    weight: 70, // kg
    height: 175, // cm
    gender: 'female',
    activityLevel: 1.2, // Sedentary
    goal: 'maintain',
  },
  logs: {}, // { '2023-10-27': { meals: [], exercise: 0 } }
};

export const storage = {
  get: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultData;
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
    storage.save(data);
  }
};

export const calculateDailyGoal = (user) => {
  // Mifflin-St Jeor Formula
  // Female: (10 * weight[kg]) + (6.25 * height[cm]) - (5 * age[y]) - 161
  // Male: (10 * weight[kg]) + (6.25 * height[cm]) - (5 * age[y]) + 5
  
  const bmr = (10 * user.weight) + (6.25 * user.height) - (5 * user.age) + (user.gender === 'female' ? -161 : 5);
  return Math.round(bmr * user.activityLevel);
};
