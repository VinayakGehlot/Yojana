import { useState } from 'react';
import { Scheme } from './schemes';
import { Language } from '../App';

interface SchemeCardProps {
  scheme: Scheme;
  language: Language;
}

export default function SchemeCard({ scheme, language }: SchemeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Formatting strings
  const title = language === 'hi' ? scheme.name_hi : scheme.name_en;
  const desc = language === 'hi' ? scheme.description_hi : scheme.description_en;
  const amountStr = scheme.benefit_amount ? `₹${scheme.benefit_amount.toLocaleString('en-IN')}` : null;

  const handlePrint = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    
    win.document.write(`
      <html>
        <head>
          <title>${scheme.name_en} - YojanaSearch</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; color: #1e293b; }
            h1 { color: #f97316; margin-bottom: 5px; }
            h3 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 24px;}
            .ministry { color: #64748b; font-size: 14px; margin-bottom: 20px; }
            .badge { background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 8px;}
            .main-benefit { font-size: 24px; color: #16a34a; font-weight: bold; margin: 20px 0; }
            ul { line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>${scheme.name_en}</h1>
          <div class="ministry">${scheme.ministry}</div>
          <p>${scheme.description_en}</p>
          <div class="main-benefit">Benefit: ${amountStr || scheme.benefits}</div>
          
          <h3>Eligibility</h3>
          <p>${scheme.eligibility}</p>
          
          <h3>Required Documents</h3>
          <ul>${scheme.documents_needed.map(doc => `<li>${doc}</li>`).join('')}</ul>
          
          <h3>How to Apply</h3>
          <ul>${scheme.how_to_apply.map(step => `<li>${step}</li>`).join('')}</ul>
          
          <div style="margin-top: 40px; font-size: 12px; color: #94a3b8; text-align: center;">
            Generated via YojanaSearch <br/>
            Official Link: ${scheme.official_link}
          </div>
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 500);
  };

  const handleShare = () => {
    const text = encodeURIComponent(`Apply for ${title} from ${scheme.ministry}. Benefits: ${scheme.benefits}. Check it out here: ${scheme.official_link}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div id={`scheme-card-${scheme.id}`} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all h-full flex flex-col items-start relative overflow-hidden group">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full opacity-50 -z-10 group-hover:scale-110 transition-transform"></div>
      
      {/* Top Badges */}
      <div className="flex flex-wrap gap-2 w-full mb-4">
        {scheme.is_new && (
          <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse flex-shrink-0">
            NEW 2024
          </span>
        )}
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
          {scheme.ministry.replace('Ministry of ', '')}
        </span>
      </div>

      {/* Main Info */}
      <div className="flex-grow w-full">
        <h3 className="text-xl md:text-2xl font-bold text-navy mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {desc}
        </p>

        {/* Highlighted Benefit */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
          <div className="text-xs text-green-700 font-bold uppercase tracking-wider mb-1">Guaranteed Benefit</div>
          <div className="text-india-green font-black text-xl md:text-2xl">
            {amountStr ? <>{amountStr} <span className="text-sm font-semibold ml-1 text-green-600 capitalize">({scheme.benefit_type})</span></> : scheme.benefits}
          </div>
        </div>

        {/* Quick Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <div className="text-slate-400 text-xs uppercase font-bold">Age Limit</div>
            <div className="font-semibold text-slate-700">{scheme.age_min} to {scheme.age_max} yrs</div>
          </div>
          <div>
            <div className="text-slate-400 text-xs uppercase font-bold">Last Date</div>
            <div className="font-semibold text-slate-700">{scheme.last_date || 'Always Open'}</div>
          </div>
        </div>
      </div>

      {/* Expandable Section */}
      <div className={`w-full overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[800px] mb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Eligibility Criteria</h4>
            <p className="text-sm text-slate-600">{scheme.eligibility}</p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Required Documents</h4>
            <ul className="grid grid-cols-2 gap-2">
              {scheme.documents_needed.map((doc, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-1">
                  <span className="text-saffron mt-0.5">•</span> {doc}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm mb-2">How to Apply</h4>
            <ol className="space-y-2">
              {scheme.how_to_apply.map((step, i) => (
                <li key={i} className="text-xs text-slate-600 flex gap-2">
                  <span className="font-bold text-slate-400">{i+1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {scheme.helpline && (
            <div className="bg-orange-50 text-orange-800 text-xs font-bold p-3 rounded-lg text-center">
              📞 Toll-Free Helpline: {scheme.helpline}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex items-center justify-between mt-2 pt-4 border-t border-slate-100 gap-2">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-saffron font-bold text-sm hover:underline"
        >
          {isExpanded ? 'Show Less' : 'View Full Details'}
        </button>

        <div className="flex gap-2">
          {/* Print Button */}
          <button 
            onClick={handlePrint}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
            title="Print or Save as PDF"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
          
          {/* WhatsApp Share Button */}
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors"
            title="Share on WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>

          {/* Official Apply */}
          <a 
            href={scheme.official_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-saffron hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-xl transition duration-200 shadow-md hover:shadow-lg text-sm"
          >
            Apply <span className="hidden sm:inline">Now</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
