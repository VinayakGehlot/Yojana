import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import ProfileForm, { UserProfile } from './components/ProfileForm';
import Results from './components/Results';
import { Banner728x90, Banner468x60 } from './components/Ads';

export type Language = 'en' | 'hi' | 'hinglish';

export default function App() {
  const [screen, setScreen] = useState<'landing' | 'profile' | 'results'>('landing');
  const [language, setLanguage] = useState<Language>('hinglish');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Load language preference from local storage
  useEffect(() => {
    const savedLang = localStorage.getItem('yojana_lang') as Language;
    if (savedLang) setLanguage(savedLang);
    
    // Also check if they already have a profile to skip landing
    const savedProfile = localStorage.getItem('yojana_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('yojana_lang', lang);
  };

  const handleProfileSubmit = (data: UserProfile) => {
    setProfile(data);
    localStorage.setItem('yojana_profile', JSON.stringify(data));
    setScreen('results');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-saffron selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setScreen('landing')}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-saffron via-navy to-india-green bg-clip-text text-transparent">
              YojanaSearch 🇮🇳
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {screen === 'results' && (
              <button 
                onClick={() => setScreen('profile')}
                className="text-sm font-medium text-navy hover:text-saffron transition-colors hidden sm:block"
              >
                {language === 'en' ? 'Edit Profile' : language === 'hi' ? 'प्रोफ़ाइल बदलें' : 'Apni Profile'}
              </button>
            )}
            
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button 
                onClick={() => handleLanguageChange('hi')}
                className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors ${language === 'hi' ? 'bg-white shadow-sm text-saffron' : 'text-slate-600 hover:text-slate-900'}`}
              >
                हिं
              </button>
              <button 
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors ${language === 'en' ? 'bg-white shadow-sm text-saffron' : 'text-slate-600 hover:text-slate-900'}`}
              >
                EN
              </button>
              <button 
                onClick={() => handleLanguageChange('hinglish')}
                className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors ${language === 'hinglish' ? 'bg-white shadow-sm text-saffron' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Mix
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto min-h-[calc(100vh-64px)] flex flex-col">
        {screen === 'landing' && <Landing language={language} onStart={() => setScreen('profile')} />}
        {screen === 'profile' && <ProfileForm language={language} initialData={profile} onSubmit={handleProfileSubmit} />}
        {screen === 'results' && profile && <Results language={language} profile={profile} />}

        <div className="mt-auto pb-8">
          {windowWidth >= 768 ? <Banner728x90 /> : <Banner468x60 />}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t-4 border-india-green">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm space-y-4">
          <p>
            {language === 'en' 
              ? "Disclaimer: This is an informational website. Visit official government websites to apply." 
              : language === 'hi' 
                ? "अस्वीकरण: यह एक सूचनात्मक वेबसाइट है। आवेदन करने के लिए आधिकारिक सरकारी वेबसाइट पर जाएं।" 
                : "Disclaimer: Yeh ek informational website hai. Apply karne ke liye official government website visit karein."}
          </p>
          <p>
            Data source: data.gov.in, india.gov.in, various ministry websites
          </p>
          <p className="flex items-center justify-center gap-2 text-slate-500">
            Made with <span className="text-saffron">♥</span> for India
          </p>
        </div>
      </footer>
    </div>
  );
}
