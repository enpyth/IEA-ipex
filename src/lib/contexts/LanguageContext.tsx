'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type SupportedLanguage = 'en' | 'zh'

interface LanguageContextValue {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('en')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('preferredLanguage') as SupportedLanguage | null
      if (saved === 'en' || saved === 'zh') {
        setLanguage(saved)
      }
    } catch {
      // ignore read errors
    }
  }, [])

  const setAndPersist = (lang: SupportedLanguage) => {
    setLanguage(lang)
    try {
      window.localStorage.setItem('preferredLanguage', lang)
    } catch {
      // ignore write errors
    }
  }

  const toggleLanguage = () => setAndPersist(language === 'en' ? 'zh' : 'en')

  const value = useMemo(
    () => ({ language, setLanguage: setAndPersist, toggleLanguage }),
    [language]
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}


