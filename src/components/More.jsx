import React from 'react';
import { User, Settings, Info, LogOut, Moon, Sun, Monitor, ChevronRight } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const More = ({ data, onEditProfile }) => {
  const menuItems = [
    { id: 'profile', icon: User, label: 'Edit Profile', action: onEditProfile },
    { id: 'reminders', icon: Settings, label: 'Reminders', action: () => alert('Reminders coming soon!') },
    { id: 'help', icon: Info, label: 'Help & Feedback', action: () => window.open('https://help.myfitnesspal.com', '_blank') },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pb-24">
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 pt-10 sticky top-0 z-10 shadow-md">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold">More</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-3 space-y-6">
        {/* User Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 text-2xl font-black border-4 border-white dark:border-gray-800 shadow-lg">
            {data.user.name[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-800 dark:text-gray-100">{data.user.name}</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Premium Member</p>
          </div>
        </div>

        {/* Action List */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.id}
                onClick={item.action}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-400">
                    <Icon size={20} />
                  </div>
                  <span className="font-bold text-gray-700 dark:text-gray-200">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            );
          })}
        </div>

        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-700 dark:text-gray-200">App Appearance</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Toggle Light / Dark Mode</p>
            </div>
            <ThemeSwitcher />
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center space-y-1">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">MyFitnessPal Lite v2.0</p>
          <p className="text-[10px] text-gray-400 italic">"Personalized for you"</p>
        </div>
      </div>
    </div>
  );
};

export default More;
