import React, { useState, useRef } from 'react';
import { Camera, Loader2, CheckCircle2, X } from 'lucide-react';
import { analyzeLabel } from '../services/gemini';

const Scanner = ({ onAddMeal }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleCapture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setResult(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Content = reader.result.split(',')[1];
        const analysis = await analyzeLabel(base64Content);
        setResult(analysis);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Scan failed", error);
      alert("Failed to analyze image. Please try again.");
      setLoading(false);
    }
  };

  const confirmMeal = () => {
    if (result) {
      onAddMeal({
        name: `Scanned Item (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        ...result,
        id: Date.now()
      });
      setResult(null);
    }
  };

  return (
    <div className="p-6 pb-24 space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">AI Label Scanner</h1>
        <p className="text-gray-500 dark:text-gray-400">Scan any nutrition label to log calories instantly.</p>
      </header>

      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-900 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800 shadow-sm">
        {!loading && !result && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center space-y-4"
          >
            <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
              <Camera size={48} strokeWidth={1.5} />
            </div>
            <span className="font-semibold text-blue-600 dark:text-blue-400">Scan Nutrition Label</span>
          </button>
        )}

        {loading && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 size={48} className="text-blue-600 dark:text-blue-400 animate-spin" />
            <p className="font-medium text-gray-600 dark:text-gray-400">Analyzing Label...</p>
          </div>
        )}

        {result && (
          <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Analysis Result</h2>
              <button onClick={() => setResult(null)} className="text-gray-400 dark:text-gray-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/40 rounded-2xl">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase">Calories</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{result.calories}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/40 rounded-2xl">
                <p className="text-xs text-green-600 dark:text-green-400 font-bold uppercase">Protein</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{result.protein}g</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/40 rounded-2xl">
                <p className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase">Carbs</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{result.carbs}g</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/40 rounded-2xl">
                <p className="text-xs text-red-600 dark:text-red-400 font-bold uppercase">Fat</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{result.fat}g</p>
              </div>
            </div>

            <button
              onClick={confirmMeal}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-200 dark:shadow-none active:scale-95 transition-transform"
            >
              <CheckCircle2 size={20} />
              <span>Log this Item</span>
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleCapture}
        accept="image/*"
        capture="environment"
        className="hidden"
      />
      
      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
        <p className="text-xs text-amber-700 dark:text-amber-500 leading-relaxed italic">
          "For best results, ensure the nutrition label is clear and well-lit. Gemini will estimate values if the label is unreadable."
        </p>
      </div>
    </div>
  );
};

export default Scanner;
