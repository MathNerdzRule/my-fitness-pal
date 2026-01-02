import React from 'react';
import { Calendar, LayoutDashboard, Camera, LineChart, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'today', label: 'Home', icon: LayoutDashboard },
    { id: 'diary', label: 'Diary', icon: Calendar },
    { id: 'scan', label: 'Scan', icon: Camera }, // Used for Scanner as requested
    { id: 'progress', label: 'Progress', icon: LineChart },
    { id: 'more', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 px-2 py-1 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-20">
      <div className="flex justify-around items-end max-w-lg mx-auto relative h-14">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          if (tab.id === 'scan') {
              return (
                <div key={tab.id} className="relative -top-6">
                    <button
                        onClick={() => onTabChange(tab.id)}
                        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-none active:scale-90 transition-transform border-4 border-white dark:border-gray-950"
                    >
                        <Camera size={28} />
                    </button>
                    <span className="text-[10px] absolute -bottom-6 left-1/2 -translate-x-1/2 font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter">Scan</span>
                </div>
              );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center py-1 flex-1 transition-all duration-200 h-full",
                isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
              )}
            >
              <Icon size={20} className={isActive ? "scale-110" : ""} />
              <span className="text-[9px] mt-1 font-bold uppercase tracking-tighter">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
