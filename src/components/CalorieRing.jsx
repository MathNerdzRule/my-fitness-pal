import React from 'react';

const CalorieRing = ({ goal = 2000, consumed = 0, exercise = 0 }) => {
  const remaining = goal - consumed + exercise;
  const percentage = Math.min((consumed / (goal + exercise)) * 100, 100);
  
  // SVG Math
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-800"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress Circle */}
          <circle
            stroke="#0072BC"
            fill="transparent"
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            strokeWidth={stroke}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute flex flex-col items-center transform">
          <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{remaining.toLocaleString()}</span>
          <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold">Remaining</span>
        </div>
      </div>
      
      <div className="flex justify-between w-full mt-6 px-4 text-center">
        <div>
          <p className="text-sm font-bold text-gray-600 dark:text-gray-300">{goal}</p>
          <p className="text-[10px] uppercase text-gray-400 dark:text-gray-500">Base Goal</p>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-600 dark:text-gray-300">{consumed}</p>
          <p className="text-[10px] uppercase text-gray-400 dark:text-gray-500">Food</p>
        </div>
        <div>
          <p className="text-sm font-bold text-green-500 dark:text-green-400">{exercise}</p>
          <p className="text-[10px] uppercase text-gray-400 dark:text-gray-500">Exercise</p>
        </div>
      </div>
    </div>
  );
};

export default CalorieRing;
