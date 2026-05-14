import { useState } from 'react';
import { Language } from '../App';
import { ChevronRight } from 'lucide-react';

export interface UserProfile {
  category: string;
  age: number | '';
  gender: string;
  state: string;
  income: number | '';
}

interface ProfileFormProps {
  language: Language;
  initialData: UserProfile | null;
  onSubmit: (data: UserProfile) => void;
}

const states = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export const CATEGORIES = [
  { id: 'student', label: '🎓 Students' },
  { id: 'farmer', label: '👨‍🌾 Farmers / Kisan' },
  { id: 'woman', label: '👩 Women / Mahila' },
  { id: 'child', label: '👶 Children (0-18)' },
  { id: 'senior', label: '🧓 Seniors (60+)' },
  { id: 'unemployed', label: '💼 Unemployed' },
  { id: 'housing', label: '🏠 Housing' },
  { id: 'health', label: '🏥 Health' },
  { id: 'loan', label: '💰 Loans' },
  { id: 'msme', label: '🏭 MSME / Startup' },
  { id: 'divyang', label: '♿ Divyang' },
  { id: 'minority', label: '🕌 Minorities' },
  { id: 'scst', label: '📿 SC/ST' },
  { id: 'obc', label: '🌿 OBC' },
  { id: 'maternity', label: '🍼 Maternity' },
  { id: 'skill', label: '⚡ Skills' },
  { id: 'rural', label: '🌾 Rural' },
  { id: 'urban_poor', label: '🌆 Urban Poor' },
  { id: 'science', label: '🔬 Science' },
  { id: 'environment', label: '💧 Environment' }
];

const INCOMES = [
  { id: 1, label: 'Below 1 Lakh' },
  { id: 3, label: '1 - 3 Lakhs' },
  { id: 8, label: '3 - 8 Lakhs' },
  { id: 999, label: '8 Lakhs+' }
];

export default function ProfileForm({ language, initialData, onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(initialData || {
    category: '',
    age: '',
    gender: '',
    state: '',
    income: ''
  });

  const t = {
    hinglish: {
      title: "Apne baare mein thoda batayein",
      q1: "Aapki Category?",
      q2: "Aapki umar kya hai?",
      q3: "Ling (Gender)?",
      q4: "Aap kahan rehte hain?",
      q7: "Annual Income?",
      btn: "Yojana Dhoondein",
      genders: [
        { id: "male", label: "Male" },
        { id: "female", label: "Female" },
        { id: "other", label: "Other" }
      ]
    },
    hi: {
      title: "अपने बारे में थोड़ा बताएं",
      q1: "आपकी श्रेणी (Category)?",
      q2: "आपकी उम्र क्या है?",
      q3: "लिंग?",
      q4: "आप कहाँ रहते हैं?",
      q7: "वार्षिक आय?",
      btn: "योजना खोजें",
      genders: [
        { id: "male", label: "पुरुष" },
        { id: "female", label: "महिला" },
        { id: "other", label: "अन्य" }
      ]
    },
    en: {
      title: "Tell us a bit about yourself",
      q1: "Your Primary Category?",
      q2: "What is your age?",
      q3: "Gender?",
      q4: "Where do you live?",
      q7: "Annual Income?",
      btn: "Find Schemes",
      genders: [
        { id: "male", label: "Male" },
        { id: "female", label: "Female" },
        { id: "other", label: "Other" }
      ]
    }
  }[language];

  const handleChange = (field: keyof UserProfile, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormComplete = !!(formData.category && formData.age !== '' && formData.gender && formData.state && formData.income !== '');

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-navy p-6 md:p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">{t.title}</h2>
          <div className="h-1 w-20 bg-saffron mt-4 rounded-full"></div>
        </div>
        
        <div className="p-6 md:p-8 space-y-10">
          <section>
            <h3 className="font-bold text-slate-800 text-lg mb-3">{t.q1}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {CATEGORIES.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleChange('category', opt.id)}
                  className={`px-3 py-2 rounded-xl border-2 text-xs md:text-sm font-semibold transition-all h-full
                    ${formData.category === opt.id 
                      ? 'border-saffron bg-orange-50 text-saffron scale-[1.02] shadow-sm' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-saffron/50 hover:bg-slate-50'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section>
              <h3 className="font-bold text-slate-800 text-lg mb-3">{t.q2}</h3>
              <input 
                type="number"
                min="0" max="120"
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || '')}
                placeholder="e.g. 25"
                className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-saffron focus:ring-4 focus:ring-orange-50 outline-none transition-all font-medium"
              />
            </section>
            
            <section>
              <h3 className="font-bold text-slate-800 text-lg mb-3">{t.q3}</h3>
              <div className="flex gap-3">
                {t.genders.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleChange('gender', opt.id)}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-all
                      ${formData.gender === opt.id ? 'border-saffron bg-orange-50 text-saffron' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section>
            <h3 className="font-bold text-slate-800 text-lg mb-3">{t.q4}</h3>
            <select 
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full md:w-1/2 p-4 rounded-xl border-2 border-slate-200 bg-white font-medium focus:border-saffron outline-none transition-all"
            >
              <option value="" disabled>Select State / UT</option>
              {states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </section>

          <section>
            <h3 className="font-bold text-slate-800 text-lg mb-3">{t.q7}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {INCOMES.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleChange('income', opt.id)}
                  className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all
                    ${formData.income === opt.id ? 'border-saffron bg-orange-50 text-saffron' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>
        </div>
        
        <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-200">
          <button
            onClick={() => isFormComplete && onSubmit(formData)}
            disabled={!isFormComplete}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all
              ${isFormComplete 
                ? 'bg-india-green text-white hover:bg-green-700 shadow-lg hover:-translate-y-1' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            {t.btn}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
