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
  logs: {}, 
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
  // Weight in kg: lbs / 2.2
  // Height in cm: ((feet * 12) + inches) * 2.54
  
  const weightKg = user.weight / 2.2;
  const heightCm = ((user.heightFeet * 12) + user.heightInches) * 2.54;
  
  const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * user.age) + (user.gender === 'female' ? -161 : 5);
  return Math.round(bmr * user.activityLevel);
};
