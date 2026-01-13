import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = "default"; // You can replace with actual user ID later

  // Real-time listener for settings
  useEffect(() => {
    const settingsRef = doc(db, "settings", userId);

    const unsubscribe = onSnapshot(
      settingsRef,
      (doc) => {
        if (doc.exists()) {
          setSettings({ id: doc.id, ...doc.data() });
        } else {
          // Create default settings if not exists
          const defaultSettings = {
            darkMode: false,
            notifications: true,
            reminderTime: "20:00",
            weeklyGoal: 5,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          setDoc(settingsRef, defaultSettings);
          setSettings({ id: userId, ...defaultSettings });
        }
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching settings:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // UPDATE settings
  const updateSettings = async (settingsData) => {
    try {
      const settingsRef = doc(db, "settings", userId);
      await setDoc(
        settingsRef,
        {
          ...settingsData,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Error updating settings:", err);
      setError(err.message);
      throw err;
    }
  };

  // TOGGLE dark mode
  const toggleDarkMode = async () => {
    if (!settings) return;
    try {
      await updateSettings({
        ...settings,
        darkMode: !settings.darkMode,
      });
    } catch (err) {
      console.error("Error toggling dark mode:", err);
      throw err;
    }
  };

  return {
    settings,
    loading,
    error,
    updateSettings,
    toggleDarkMode,
  };
};
