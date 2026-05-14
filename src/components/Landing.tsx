import { Language } from '../App';
import { ArrowRight, Search, ShieldCheck, Zap } from 'lucide-react';

interface LandingProps {
  language: Language;
  onStart: () => void;
}

export default function Landing({ language, onStart }: LandingProps) {
  const content = {
    hinglish: {
      tagline: "Apni yojana khud dhundo — Free mein!",
      title: "Sarkari Yojano Ka Smart Search Engine",
      subtitle: "Sirf 2 minute mein form bharein aur pata karein ki aap kin sarkari yojano ka fayda utha sakte hain. Har state aur category ki yojanayein ek jagah.",
      cta: "Abhi Check Karein",
      features: [
        { title: "Smart Filter", desc: "Aapki profile ke hisaab se best schemes" },
        { title: "Bilkul Free", desc: "Koi hidden charges nahi, direct links" },
        { title: "100% Genuine", desc: "Official gov.in websites ke direct links" }
      ]
    },
    hi: {
      tagline: "अपनी योजना खुद ढूंढें — बिल्कुल मुफ्त!",
      title: "सरकारी योजनाओं का स्मार्ट सर्च इंजन",
      subtitle: "केवल 2 मिनट में फॉर्म भरें और जानें कि आप किन सरकारी योजनाओं का लाभ उठा सकते हैं। हर राज्य और श्रेणी की योजनाएं एक जगह।",
      cta: "अभी चेक करें",
      features: [
        { title: "स्मार्ट फ़िल्टर", desc: "आपकी प्रोफ़ाइल के अनुसार सर्वोत्तम योजनाएं" },
        { title: "बिल्कुल मुफ्त", desc: "कोई छिपा शुल्क नहीं, सीधे लिंक" },
        { title: "100% असली", desc: "आधिकारिक gov.in वेबसाइटों के सीधे लिंक" }
      ]
    },
    en: {
      tagline: "Find your eligible schemes — For Free!",
      title: "Smart Search Engine for Government Schemes",
      subtitle: "Fill a 2-minute form and discover which government schemes you can benefit from. Schemes for every state and category in one place.",
      cta: "Check Eligibility Now",
      features: [
        { title: "Smart Filter", desc: "Best schemes matched to your profile" },
        { title: "Completely Free", desc: "No hidden charges, direct application links" },
        { title: "100% Genuine", desc: "Direct links to official gov.in websites" }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12 overflow-hidden">
      {/* Ashoka Chakra Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -z-10">
        <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] text-navy animate-[spin_120s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="48" />
          <circle cx="50" cy="50" r="40" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line 
              key={i}
              x1="50" y1="50" 
              x2={50 + 40 * Math.cos(i * 15 * Math.PI / 180)} 
              y2={50 + 40 * Math.sin(i * 15 * Math.PI / 180)} 
            />
          ))}
        </svg>
      </div>

      <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-saffron border border-orange-100 font-medium text-sm">
          <Zap className="w-4 h-4" />
          {t.tagline}
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-navy tracking-tight leading-tight">
          {t.title}
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          {t.subtitle}
        </p>

        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white transition-all bg-india-green rounded-2xl hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/20 hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative">{t.cta}</span>
          <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 mt-12 border-t border-slate-200">
          {[
            { icon: Search, ...t.features[0], color: "text-blue-500", bg: "bg-blue-50" },
            { icon: Zap, ...t.features[1], color: "text-saffron", bg: "bg-orange-50" },
            { icon: ShieldCheck, ...t.features[2], color: "text-india-green", bg: "bg-green-50" },
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`p-4 rounded-full ${feature.bg} ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">{feature.title}</h3>
              <p className="text-sm text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
