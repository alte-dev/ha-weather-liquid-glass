import type { TranslationSchema } from '@/locales/types';
import { en } from '@/locales/en';
import { tr } from '@/locales/tr';
import { de } from '@/locales/de';
import { es } from '@/locales/es';
import { fr } from '@/locales/fr';

const translations: Record<string, TranslationSchema> = {
  en,
  tr,
  de,
  es,
  fr,
};

class TranslationService {
  public getLocale(localeStr?: string): string {
    if (!localeStr) return 'en';
    const clean = localeStr.toLowerCase().split(/[-_]/)[0];
    return translations[clean] ? clean : 'en';
  }

  public get(localeStr?: string): TranslationSchema {
    const lang = this.getLocale(localeStr);
    return translations[lang] || en;
  }

  public translateCondition(condition: string, localeStr?: string): string {
    const t = this.get(localeStr);
    const key = (condition || '').toLowerCase().replace(/_/g, '-');
    return t.conditions[key] || (condition ? condition.charAt(0).toUpperCase() + condition.slice(1) : 'Fair');
  }
}

export default new TranslationService();
