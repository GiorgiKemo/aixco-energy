'use client';

import React from 'react';
import { keyedTranslations, languageOptions, textTranslations, type Lang } from './translations';

type Direction = 'ltr' | 'rtl';

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  tx: (text: string) => string;
  dir: Direction;
};

const DEFAULT_LANG: Lang = 'en';
const STORAGE_KEY = 'aixco-lang';
const I18nContext = React.createContext<I18nContextValue | null>(null);

export const LANGS = languageOptions;

function isLang(value: string | null | undefined): value is Lang {
  return Boolean(value && languageOptions.some((item) => item.code === value));
}

function getDirection(lang: Lang): Direction {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

function normalizeText(value: string) {
  return value.normalize('NFC').replace(/\s+/g, ' ').trim();
}

const normalizedTextTranslations = Object.entries(textTranslations).reduce<Record<string, (typeof textTranslations)[string]>>(
  (acc, [key, value]) => {
    acc[normalizeText(key)] = value;
    acc[normalizeText(key).toLocaleLowerCase('en')] = value;
    return acc;
  },
  {},
);

export function hasTextTranslation(text: string, lang: Lang) {
  if (lang === DEFAULT_LANG) return true;
  const normalized = normalizeText(text);
  return Boolean(
    textTranslations[text]?.[lang] ??
      normalizedTextTranslations[normalized]?.[lang] ??
      normalizedTextTranslations[normalized.toLocaleLowerCase('en')]?.[lang],
  );
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>(DEFAULT_LANG);
  const [hasLoadedStoredLang, setHasLoadedStoredLang] = React.useState(false);
  const dir = getDirection(lang);

  React.useEffect(() => {
    try {
      const storedLang = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(storedLang)) {
        setLangState(storedLang);
      }
    } catch {
      // Local storage can be unavailable in strict privacy modes.
    } finally {
      setHasLoadedStoredLang(true);
    }
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.lang = lang;
    root.dir = dir;
    body.dir = dir;
    root.classList.toggle('translated-ltr', lang !== DEFAULT_LANG && dir === 'ltr');
    root.classList.toggle('translated-rtl', lang !== DEFAULT_LANG && dir === 'rtl');
    body.classList.toggle('translated-ltr', lang !== DEFAULT_LANG && dir === 'ltr');
    body.classList.toggle('translated-rtl', lang !== DEFAULT_LANG && dir === 'rtl');

    if (hasLoadedStoredLang) {
      try {
        window.localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // Ignore storage errors so language switching remains usable.
      }
    }
  }, [dir, hasLoadedStoredLang, lang]);

  const setLang = React.useCallback((nextLang: Lang) => {
    setLangState(nextLang);
  }, []);

  const tx = React.useCallback(
    (text: string) => {
      if (!text) return text;

      const normalized = normalizeText(text);
      const translated =
        textTranslations[text]?.[lang] ??
        normalizedTextTranslations[normalized]?.[lang] ??
        normalizedTextTranslations[normalized.toLocaleLowerCase('en')]?.[lang];

      if (translated) return translated;

      // Fallback: if not found in current lang, try English if current is not English
      if (lang !== DEFAULT_LANG) {
        return (
          textTranslations[text]?.[DEFAULT_LANG] ??
          normalizedTextTranslations[normalized]?.[DEFAULT_LANG] ??
          normalizedTextTranslations[normalized.toLocaleLowerCase('en')]?.[DEFAULT_LANG] ??
          text
        );
      }

      return text;
    },
    [lang],
  );

  const t = React.useCallback(
    (key: string) => {
      if (!key || lang === DEFAULT_LANG) return keyedTranslations[key]?.en ?? key;
      return keyedTranslations[key]?.[lang] ?? keyedTranslations[key]?.en ?? key;
    },
    [lang],
  );

  const value = React.useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t,
      tx,
      dir,
    }),
    [dir, lang, setLang, t, tx],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

export function useOptionalI18n() {
  return React.useContext(I18nContext);
}
