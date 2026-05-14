import { useEffect, useState } from 'react';
import { Language } from '../App';
import { CheckCircle2, Loader2, Share2, Smartphone } from 'lucide-react';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
  language: Language;
}

export default function UnlockModal({ isOpen, onClose, onUnlock, language }: UnlockModalProps) {
  const [timeLeft, setTimeLeft] = useState(15);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(15);
      setIsVerifying(true);
      return;
    }

    if (timeLeft <= 0) {
      setIsVerifying(false);
      const timeout = setTimeout(() => {
        onUnlock();
      }, 1500); // Wait a bit after 0 to show success then close
      return () => clearTimeout(timeout);
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onUnlock, isOpen]);

  const t = {
    hinglish: {
      verifying: "System share verify kar raha hai...",
      wait: "Kripya intezaar karein",
      success: "Share Verify Ho Gaya!",
      successSub: "2 Nayi yojanayein unlock ho gayi hain",
    },
    hi: {
      verifying: "सिस्टम शेयर वेरीफाई कर रहा है...",
      wait: "कृपया प्रतीक्षा करें",
      success: "शेयर वेरीफाई हो गया!",
      successSub: "2 नई योजनाएं अनलॉक हो गई हैं",
    },
    en: {
      verifying: "System is verifying your share...",
      wait: "Please wait",
      success: "Share Verified!",
      successSub: "2 new schemes have been unlocked",
    }
  }[language];

  // Circle progress calculation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((15 - timeLeft) / 15) * circumference;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-navy/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
        
        {/* Background Decorative patterns */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#25D366]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-saffron/10 rounded-full blur-3xl"></div>

        {isVerifying ? (
          <div className="relative animate-in zoom-in duration-300">
            
            {/* Countdown Circle */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  className="text-slate-100" 
                  strokeWidth="8" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r={radius} cx="50" cy="50" 
                />
                <circle 
                  className="text-[#25D366] transition-all duration-1000 ease-linear" 
                  strokeWidth="8" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r={radius} cx="50" cy="50" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pb-1">
                <span className="text-3xl font-black text-navy">{Math.max(0, timeLeft)}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SEC</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">{t.verifying}</h3>
            <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#25D366]" />
              {t.wait}
            </p>
          </div>
        ) : (
          <div className="relative animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner shadow-green-500/20">
              <CheckCircle2 className="w-12 h-12 text-[#25D366]" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">{t.success}</h3>
            <p className="text-slate-500 font-medium">{t.successSub}</p>
          </div>
        )}

      </div>
    </div>
  );
}
