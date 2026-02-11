import { useState, useEffect } from "react";

export const useSettings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    reminderTime: "20:00",
    weeklyGoal: 5,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = async (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("appSettings", JSON.stringify(updated));
  };

  const toggleDarkMode = async () => {
    await updateSettings({ darkMode: !settings.darkMode });
  };

  return {
    settings,
    updateSettings,
    toggleDarkMode,
  };
};
