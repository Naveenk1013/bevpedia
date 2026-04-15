import React, { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', native: 'English' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', native: 'हिन्दी' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳', native: 'ગુજરાતી' },
  { code: 'fr', name: 'French', flag: '🇫🇷', native: 'Français' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', native: 'Русский' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', native: '日本語' },
  { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳', native: '中文' },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [isLoaded, setIsLoaded] = useState(false);
  const dropdownRef = useRef(null);

  // Load saved language and Google Translate script
  useEffect(() => {
    const savedLang = localStorage.getItem('iks-language') || 'en';
    setCurrentLang(savedLang);

    if (document.getElementById('google-translate-script')) {
      setIsLoaded(true);
      if (savedLang !== 'en') {
        const checkInterval = setInterval(() => {
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            select.value = savedLang;
            select.dispatchEvent(new Event('change'));
            clearInterval(checkInterval);
          }
        }, 500);
        setTimeout(() => clearInterval(checkInterval), 5000); // Guard
      }
      return;
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,gu,fr,ru,ja,zh-CN',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
      setIsLoaded(true);
      
      // Apply saved language after init
      if (savedLang !== 'en') {
        setTimeout(() => {
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            select.value = savedLang;
            select.dispatchEvent(new Event('change'));
          }
        }, 1000);
      }
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {};
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (langCode) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    localStorage.setItem('iks-language', langCode);

    // Set the Google Translate cookie directly for maximum reliability
    const cookieValue = langCode === 'en' ? '' : `/en/${langCode}`;
    
    // Set for current domain and subdomains
    document.cookie = `googtrans=${cookieValue}; path=/`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.${window.location.hostname}`;

    // Trigger Google Translate's hidden combo box if available
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode === 'en' ? '' : langCode;
      select.dispatchEvent(new Event('change'));
      
      // For switching back to English, a reload is often necessary to fully clear the translation
      if (langCode === 'en') {
        const frame = document.querySelector('.goog-te-banner-frame');
        if (frame) {
          const innerDoc = frame.contentDocument || frame.contentWindow.document;
          const restoreBtn = innerDoc.querySelector('.goog-close-link');
          if (restoreBtn) restoreBtn.click();
        }
        
        // Final flush of cookies and reload
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname;
        
        setTimeout(() => window.location.reload(), 150);
      }
    } else {
      // Fallback: If select isn't ready, the cookie + reload will handle it
      if (langCode !== 'en') {
        window.location.reload();
      }
    }
  };

  const activeLang = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }} />

      <div className="iks-lang-wrapper" ref={dropdownRef}>
        <button
          className="iks-lang-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Change Language"
          title="Change Language"
        >
          <Globe size={16} />
          <span className="iks-lang-current">{activeLang.flag}</span>
        </button>

        {isOpen && (
          <div className="iks-lang-dropdown">
            <div className="iks-lang-dropdown-header">
              <span className="iks-mono" style={{ fontSize: '9px', letterSpacing: '3px' }}>SELECT LANGUAGE</span>
            </div>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className={`iks-lang-option ${currentLang === lang.code ? 'active' : ''}`}
                onClick={() => switchLanguage(lang.code)}
              >
                <span className="iks-lang-flag">{lang.flag}</span>
                <div className="iks-lang-names">
                  <span className="iks-lang-name">{lang.name}</span>
                  <span className="iks-lang-native">{lang.native}</span>
                </div>
                {currentLang === lang.code && (
                  <span className="iks-lang-check">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageSelector;
