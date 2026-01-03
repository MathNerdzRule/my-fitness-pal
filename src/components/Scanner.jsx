import React, { useState, useRef, useEffect } from 'react';
import { Camera, Loader2, CheckCircle2, X, Barcode, Scan, AlertCircle } from 'lucide-react';
import { analyzeLabel } from '../services/gemini';
import { lookupUPC } from '../services/upc';
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanner = ({ onAddMeal, onManualEntry }) => {
  const [mode, setMode] = useState('barcode'); // 'barcode' or 'ai'
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedSection, setSelectedSection] = useState('breakfast');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  
  // Barcode scanner instance
  useEffect(() => {
    if (mode === 'barcode' && !result && !loading) {
      const scanner = new Html5QrcodeScanner("reader", { 
        fps: 10, 
        qrbox: { width: 250, height: 150 },
        aspectRatio: 1.0
      });

      const onScanSuccess = async (decodedText) => {
        scanner.clear();
        setLoading(true);
        setError(null);
        
        try {
          const product = await lookupUPC(decodedText);
          if (product) {
            setResult(product);
          } else {
            setError("Product not found in database. Try AI Label or Manual entry.");
          }
        } catch (err) {
          setError("Lookup failed. Please check connection.");
        } finally {
          setLoading(false);
        }
      };

      scanner.render(onScanSuccess, (err) => {
        // Silent fail for every frame search
      });

      return () => {
        scanner.clear().catch(e => console.error("Scanner clear failed", e));
      };
    }
  }, [mode, result, loading]);

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1024;
          const MAX_HEIGHT = 1024;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8).split(',')[1]);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAIAnalysis = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const compressedBase64 = await resizeImage(file);
      const analysis = await analyzeLabel(compressedBase64);
      setResult({
        ...analysis,
        name: `Scanned Label (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`
      });
    } catch (err) {
      setError("AI analysis failed. The image might be too blurry.");
    } finally {
      setLoading(false);
    }
  };

  const confirmMeal = () => {
    if (result) {
      onAddMeal({
        ...result,
        section: selectedSection,
        id: Date.now()
      });
      setResult(null);
    }
  };

  const sections = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snacks', label: 'Snack' }
  ];

  return (
    <div className="p-6 pb-24 space-y-6 min-h-screen">
      <header className="text-center space-y-4">
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl max-w-[300px] mx-auto">
          <button 
            onClick={() => { setMode('barcode'); setResult(null); setError(null); }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'barcode' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-400'}`}
          >
            <Barcode size={16} />
            <span>Barcode</span>
          </button>
          <button 
            onClick={() => { setMode('ai'); setResult(null); setError(null); }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'ai' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-400'}`}
          >
            <Scan size={16} />
            <span>AI Label</span>
          </button>
        </div>
      </header>

      {/* Primary Scanner Area */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border-2 border-dashed border-gray-100 dark:border-gray-800 p-4 shadow-sm relative overflow-hidden">
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
            <Loader2 size={48} className="text-blue-600 animate-spin" />
            <div className="space-y-2">
              <p className="font-black text-gray-800 dark:text-gray-100">Looking up product...</p>
              <p className="text-sm text-gray-400 max-w-[200px] mx-auto italic">Checking the global food database.</p>
            </div>
            <button onClick={onManualEntry} className="text-xs font-black text-blue-500 uppercase tracking-widest">or enter manually</button>
          </div>
        )}

        {!loading && !result && mode === 'barcode' && (
          <div id="reader" className="overflow-hidden rounded-2xl"></div>
        )}

        {!loading && !result && mode === 'ai' && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600">
                <Camera size={32} />
              </div>
              <p className="font-black text-blue-600 uppercase text-xs tracking-widest">Take a Photo</p>
            </button>
            <p className="text-[10px] text-gray-400 text-center max-w-[200px] italic">Snapshot the "Nutrition Facts" panel.</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center px-4">
            <AlertCircle size={40} className="text-amber-500" />
            <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{error}</p>
            <div className="flex flex-col space-y-2 w-full">
              <button onClick={() => setError(null)} className="text-xs font-black text-blue-600 uppercase tracking-tighter bg-blue-50 dark:bg-blue-900/20 py-3 rounded-xl">Try Again</button>
              <button onClick={onManualEntry} className="text-xs font-black text-gray-400 uppercase tracking-tighter">Manual Entry</button>
            </div>
          </div>
        )}

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Found it!</h3>
                  <p className="text-xl font-black text-gray-800 dark:text-gray-100 leading-tight">{result.name}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    {result.brand && <p className="text-[10px] text-gray-400 font-bold uppercase">{result.brand}</p>}
                    {result.serving_size && <p className="text-[10px] text-blue-500 font-bold uppercase italic">Serving: {result.serving_size}</p>}
                  </div>
               </div>
               <button onClick={() => setResult(null)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                  <X size={24} />
               </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-xl text-center">
                 <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Cal</p>
                 <p className="text-lg font-black text-gray-800 dark:text-gray-100">{result.calories}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-xl text-center">
                 <p className="text-[10px] font-black text-green-600 uppercase mb-1">Prot</p>
                 <p className="text-lg font-black text-gray-800 dark:text-gray-100">{result.protein}g</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-xl text-center">
                 <p className="text-[10px] font-black text-orange-600 uppercase mb-1">Carb</p>
                 <p className="text-lg font-black text-gray-800 dark:text-gray-100">{result.carbs}g</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-xl text-center">
                 <p className="text-[10px] font-black text-red-600 uppercase mb-1">Fat</p>
                 <p className="text-lg font-black text-gray-800 dark:text-gray-100">{result.fat}g</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Log to Section</p>
              <div className="grid grid-cols-2 gap-2">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSection(s.id)}
                    className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border-2 ${
                      selectedSection === s.id 
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100 dark:shadow-none" 
                        : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <button
               onClick={confirmMeal}
               className="w-full bg-blue-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-blue-100 dark:shadow-none active:scale-95 transition-transform text-lg"
            >
               Log to Diary
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAIAnalysis}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Instruction Card */}
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800">
         <div className="flex items-center space-x-3 text-blue-600 dark:text-blue-400 mb-2">
            <AlertCircle size={18} />
            <h4 className="text-xs font-black uppercase tracking-widest">Quick Tip</h4>
         </div>
         <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
            {mode === 'barcode' 
              ? "Center the barcode in the window. If it's not in the database, try using the AI Label scanner instead."
              : "Try to get the Nutrition Facts grid in clear focus for the AI to read accurately."
            }
         </p>
      </div>

      <style>{`
        #reader { border: none !important; }
        #reader__scan_region { background: transparent !important; }
        #reader__dashboard_section_csr button {
          background: #0072BC !important;
          color: white !important;
          border-radius: 12px !important;
          padding: 8px 16px !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          font-size: 10px !important;
          border: none !important;
          margin-top: 10px !important;
        }
        #reader__status_span { font-size: 10px !important; font-weight: 800 !important; color: #9CA3AF !important; }
      `}</style>
    </div>
  );
};

export default Scanner;
