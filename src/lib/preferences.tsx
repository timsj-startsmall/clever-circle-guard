import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Preferences = {
  largeText: boolean;
  highContrast: boolean;
  darkMode: boolean;
  readAloud: boolean;
  voiceMode: boolean;
  alertsHigh: boolean;
  alertsWeekly: boolean;
};

const defaults: Preferences = {
  largeText: false,
  highContrast: false,
  darkMode: false,
  readAloud: false,
  voiceMode: false,
  alertsHigh: true,
  alertsWeekly: true,
};

const STORAGE_KEY = "safecircle:preferences";

const PreferencesContext = createContext<{
  prefs: Preferences;
  setPref: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
}>({ prefs: defaults, setPref: () => {} });

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(defaults);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setPrefs({ ...defaults, ...(JSON.parse(stored) as Partial<Preferences>) });
    } catch {
      /* ignore unreadable storage */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", prefs.darkMode);
    root.classList.toggle("text-xl-mode", prefs.largeText);
    root.classList.toggle("contrast-boost", prefs.highContrast);
  }, [prefs.darkMode, prefs.largeText, prefs.highContrast]);

  const setPref = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPrefs((current) => {
      const next = { ...current, [key]: value };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore unwritable storage */
      }
      return next;
    });
  };

  return <PreferencesContext.Provider value={{ prefs, setPref }}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  return useContext(PreferencesContext);
}

/** Reads text aloud when the "read aloud" preference is on. */
export function useSpeak() {
  const { prefs } = usePreferences();
  return (text: string) => {
    if (!prefs.readAloud || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };
}
