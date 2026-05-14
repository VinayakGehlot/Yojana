import { useState, useMemo } from 'react';
import { Language } from '../App';
import { UserProfile, CATEGORIES } from './ProfileForm';
import { SCHEMES_DATA } from './schemes';
import SchemeCard from './SchemeCard';
import UnlockModal from './UnlockModal';
import { NativeBanner } from './Ads';

interface ResultsProps {
  language: Language;
  profile: UserProfile;
}

export default function Results({ language, profile }: ResultsProps) {
  const [unlockedCounts, setUnlockedCounts] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem('yojana_unlocked_counts');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    // Fallback to legacy structure or default
    return {};
  });
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // User can click chips to explore other categories. Defaults to their profile category.
  const [activeChip, setActiveChip] = useState<string>(profile.category || 'all');

  const currentUnlockedCount = unlockedCounts[activeChip] || 2;

  // Filter Logic matching prompt STRICT constraints
  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATA.filter(scheme => {
      // OVERRIDING CHIP: If activeChip is 'all', show all that match profile.
      // If a specific chip is selected, strictly check if scheme is in that category.
      const categoryToMatch = activeChip === 'all' ? profile.category : activeChip;
      const categoryMatch = !categoryToMatch || categoryToMatch === 'all' || scheme.category.includes(categoryToMatch);
      
      const genderMatch = scheme.gender.includes(profile.gender) || scheme.gender.includes('other') || scheme.gender.includes('all');
      
      const pAge = typeof profile.age === 'number' ? profile.age : 0;
      const ageMatch = pAge >= scheme.age_min && pAge <= scheme.age_max;
      
      const incomeLevel = profile.income || 0;
      const incomeMatch = scheme.income_max === 999 || incomeLevel <= scheme.income_max;
      
      const stateMatch = scheme.states.includes('all') || scheme.states.includes(profile.state);

      // Search match (tags, ministry, name, descriptions)
      const query = searchQuery.toLowerCase().trim();
      const searchMatch = !query || 
        scheme.name_en.toLowerCase().includes(query) ||
        scheme.name_hi.includes(query) ||
        scheme.ministry.toLowerCase().includes(query) ||
        scheme.benefits.toLowerCase().includes(query) ||
        scheme.tags.some(t => t.toLowerCase().includes(query));

      return categoryMatch && genderMatch && ageMatch && incomeMatch && stateMatch && searchMatch;
    });
  }, [profile, activeChip, searchQuery]);

  const t = {
    hinglish: {
      found: "Yojane Mili",
      unlocked: "Unlocked",
      locked: "Locked",
      searchPlaceholder: "Naam, faayda ya tag se dhundhein...",
      allCategories: "Sabhi"
    },
    hi: {
      found: "योजनाएं मिलीं",
      unlocked: "अनलॉक की गईं",
      locked: "लॉक की गईं",
      searchPlaceholder: "नाम, लाभ या टैग खोजें...",
      allCategories: "सभी"
    },
    en: {
      found: "Schemes Found",
      unlocked: "Unlocked",
      locked: "Locked",
      searchPlaceholder: "Search by name, benefit or tag...",
      allCategories: "All Profile"
    }
  }[language];

  const lockedCount = Math.max(0, filteredSchemes.length - currentUnlockedCount);

  const handleUnlockMore = () => {
    const newCount = currentUnlockedCount + 2;
    const newCounts = { ...unlockedCounts, [activeChip]: newCount };
    setUnlockedCounts(newCounts);
    localStorage.setItem('yojana_unlocked_counts', JSON.stringify(newCounts));
    setShowModal(false);
  };

  const handleShareClick = () => {
    const shareUrl = window.location.origin;
    let shareText = '';
    
    if (language === 'hi') {
      shareText = `🚨 *सबसे बड़ी खुशखबरी* 🚨\n\nमैंने अभी सरकारी वेबसाइट पे चेक किया, मुजे लाखों रुपये तक के फायदे वाली योजनाएं मिली हैं! 🔥\n\nसबको कुछ ना कुछ मिल रहा है, बस ये 2-मिनट का फॉर्म भरना है। बिल्कुल फ्री है!\n\n*अपना मौका मत चूकना, बाद में मत कहना बताया नहीं!* जल्दी अपना फॉर्म भरो और पैसे क्लेम करो 👇👇\n${shareUrl}`;
    } else if (language === 'en') {
      shareText = `🚨 *HUGE NEWS* 🚨\n\nI just checked and found out I am eligible for lakhs of rupees in Govt benefits! 🔥\n\nEveryone is getting something. You just need to fill a free 2-minute form!\n\n*Don't miss out on this!* Quickly check your eligibility here 👇👇\n${shareUrl}`;
    } else {
      shareText = `🚨 *SABSE BADI KHUSHKHABRI* 🚨\n\nMaine abhi check kiya, mujhe lakho rupaye tak ke fayde wali yojanayein mili hain! 🔥\n\nSabko kuch na kuch mil raha hai. Bilkul free hai!\n\n*Apna mauka mat chukna!* Jaldi apna form bharo aur paise claim karo 👇👇\n${shareUrl}`;
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile 
      ? `whatsapp://send?text=${encodeURIComponent(shareText)}`
      : `https://web.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    
    // First trigger the whatsapp URL using an anchor link approach for mobile reliability
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Then show our modal
    setTimeout(() => {
      setShowModal(true);
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      
      {/* Search and Stats Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 w-full max-w-md">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full outline-none text-lg bg-transparent"
            />
          </div>
          <div className="hidden md:flex items-center gap-6 font-bold text-sm">
            <div className="text-saffron bg-orange-50 px-3 py-1 rounded-full">{filteredSchemes.length} {t.found}</div>
            <div className="text-india-green bg-green-50 px-3 py-1 rounded-full">{Math.min(currentUnlockedCount, filteredSchemes.length)} {t.unlocked}</div>
            <div className="text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{lockedCount} {t.locked}</div>
          </div>
        </div>
      </div>

      {/* Horizontal Category Chips */}
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 hide-scrollbar">
        <button
          onClick={() => setActiveChip('all')}
          className={`shrink-0 px-4 py-2 rounded-full font-semibold border transition-all ${
            activeChip === 'all' ? 'bg-navy text-white border-navy' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {t.allCategories}
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveChip(cat.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeChip === cat.id ? 'bg-saffron text-white border-saffron' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mobile Stats */}
      <div className="flex md:hidden justify-between items-center mb-6 font-bold text-xs gap-2">
        <div className="text-saffron flex-1 text-center bg-orange-50 py-2 rounded-xl">{filteredSchemes.length} {t.found}</div>
        <div className="text-india-green flex-1 text-center bg-green-50 py-2 rounded-xl">{Math.min(currentUnlockedCount, filteredSchemes.length)} {t.unlocked}</div>
        <div className="text-slate-500 flex-1 text-center bg-slate-100 py-2 rounded-xl">{lockedCount} {t.locked}</div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme, index) => {
          const isLocked = index >= currentUnlockedCount;
          return (
            <div key={scheme.id} className="relative">
              <div className={`transition-all duration-300 h-full ${isLocked ? 'blur-md pointer-events-none opacity-60' : ''}`}>
                <SchemeCard scheme={scheme} language={language} />
              </div>

              {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="bg-white/90 p-6 rounded-2xl shadow-xl max-w-sm w-full mx-auto backdrop-blur-sm border border-slate-200">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-navy">
                      {language === 'en' ? 'Scheme Locked' : language === 'hi' ? 'योजना लॉक है' : 'Yojana Lock Hai'}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      {language === 'en' 
                        ? 'Share with friends to instantly unlock 2 more schemes!' 
                        : language === 'hi' 
                          ? '2 और योजनाएं खोलने के लिए दोस्तों के साथ शेयर करें!' 
                          : 'Doston ke saath share karke 2 aur yojanayein unlock karein!'}
                    </p>
                    <button
                      onClick={handleShareClick}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 mb-4"
                    >
                      <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Share to Unlock
                    </button>
                    
                    <a 
                      href="https://www.profitablecpmratenetwork.com/i3hndj4i?key=41a24886e53bb79862fbfd91d3a10f9f" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {language === 'hi' ? 'वीआईपी बोनस पाएं' : language === 'en' ? 'Claim VIP Bonus' : 'VIP Bonus Paayein'}
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {language === 'en' ? 'No schemes found' : language === 'hi' ? 'कोई योजना नहीं मिली' : 'Koi scheme nahi mili'}
          </h2>
          <p className="text-slate-500">
            {language === 'en' ? 'Try adjusting your filters or search term' : 'कृपया खोज या फ़िल्टर बदलें'}
          </p>
        </div>
      )}

      <NativeBanner />

      <UnlockModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onUnlock={handleUnlockMore}
        language={language} 
      />
    </div>
  );
}
