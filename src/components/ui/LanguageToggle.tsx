import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs">{language === 'zh' ? 'EN' : '中'}</span>
    </button>
  );
}
