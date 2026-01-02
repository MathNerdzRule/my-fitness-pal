import React from 'react';
import { Calendar, LayoutDashboard, Camera, LineChart } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'today', label: 'Today', icon: LayoutDashboard },
    { id: 'diary', label: 'Diary', icon: Calendar },
    { id: 'scan', label: 'Scan', icon: Camera },
    { id: 'progress', label: 'Progress', icon: LineChart },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-6 py-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200",
                isActive ? "text-blue-600 dark:text-blue-400 scale-110" : "text-gray-400 dark:text-gray-500"
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
