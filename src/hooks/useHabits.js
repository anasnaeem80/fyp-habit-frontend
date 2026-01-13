import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "/src/config";

export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Real-time listener for habits
  useEffect(() => {
    try {
      const habitsRef = collection(db, "habits");
      const q = query(habitsRef, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const habitsData = [];
          snapshot.forEach((doc) => {
            habitsData.push({ id: doc.id, ...doc.data() });
          });
          setHabits(habitsData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error("Error fetching habits:", err);
          setError("Failed to load habits. Please check your connection.");
          setLoading(false);

          // Fallback to mock data for development
          if (process.env.NODE_ENV === "development") {
            console.log("Using mock data for development");
            const mockHabits = [
              {
                id: "1",
                name: "Morning Meditation",
                description: "Start the day with 10 minutes of meditation",
                category: "Wellness",
                color: "bg-blue-500",
                completion: [true, true, false, true, false, false, true],
                currentStreak: 3,
                longestStreak: 5,
                goal: 7,
                createdAt: new Date(),
              },
              {
                id: "2",
                name: "Evening Walk",
                description: "30 minute walk after dinner",
                category: "Fitness",
                color: "bg-green-500",
                completion: [true, true, true, true, true, false, true],
                currentStreak: 5,
                longestStreak: 7,
                goal: 7,
                createdAt: new Date(),
              },
            ];
            setHabits(mockHabits);
            setLoading(false);
          }
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up habits listener:", err);
      setError("Failed to initialize habits. Please refresh the page.");
      setLoading(false);
    }
  }, []);

  // ADD new habit
  const addHabit = async (habitData) => {
    try {
      const habitsRef = collection(db, "habits");
      const newHabit = {
        ...habitData,
        completion: Array(7).fill(false),
        currentStreak: 0,
        longestStreak: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(habitsRef, newHabit);
      return { id: docRef.id, ...newHabit };
    } catch (err) {
      console.error("Error adding habit:", err);
      setError("Failed to add habit. Please try again.");
      throw err;
    }
  };

  // UPDATE habit
  const updateHabit = async (id, habitData) => {
    try {
      const habitRef = doc(db, "habits", id);
      await updateDoc(habitRef, {
        ...habitData,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error updating habit:", err);
      setError("Failed to update habit.");
      throw err;
    }
  };

  // DELETE habit
  const deleteHabit = async (id) => {
    try {
      const habitRef = doc(db, "habits", id);
      await deleteDoc(habitRef);
    } catch (err) {
      console.error("Error deleting habit:", err);
      setError("Failed to delete habit.");
      throw err;
    }
  };

  // TOGGLE completion
  const toggleHabitCompletion = async (id, day) => {
    try {
      const habit = habits.find((h) => h.id === id);
      if (!habit) return;

      const completion = [...habit.completion];
      if (day >= 0 && day < completion.length) {
        completion[day] = !completion[day];
      }

      // Calculate streak
      let currentStreak = 0;
      for (let i = 6; i >= 0; i--) {
        if (completion[i]) {
          currentStreak++;
        } else {
          break;
        }
      }

      const longestStreak = Math.max(habit.longestStreak, currentStreak);

      const habitRef = doc(db, "habits", id);
      await updateDoc(habitRef, {
        completion,
        currentStreak,
        longestStreak,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error toggling habit:", err);
      setError("Failed to update habit completion.");
      throw err;
    }
  };

  // GET statistics
  const getStatistics = () => {
    const stats = {
      totalHabits: habits.length,
      completedToday: 0,
      averageCompletion: 0,
      bestStreak: 0,
      strugglingHabits: [],
      categoryDistribution: {},
    };

    if (habits.length > 0) {
      const today = new Date().getDay();
      stats.completedToday = habits.filter((h) => h.completion[today]).length;

      // Calculate average completion
      const totalCompletion = habits.reduce((sum, habit) => {
        const completed = habit.completion.filter(Boolean).length;
        return sum + completed / habit.completion.length;
      }, 0);

      stats.averageCompletion = Math.round(
        (totalCompletion / habits.length) * 100
      );
      stats.bestStreak = Math.max(...habits.map((h) => h.currentStreak), 0);

      // Find struggling habits (less than 30% completion)
      stats.strugglingHabits = habits
        .filter((habit) => {
          const completed = habit.completion.filter(Boolean).length;
          return completed / habit.completion.length < 0.3;
        })
        .map((habit) => ({
          id: habit.id,
          name: habit.name,
          completionRate: Math.round(
            (habit.completion.filter(Boolean).length /
              habit.completion.length) *
              100
          ),
        }));

      // Calculate category distribution
      habits.forEach((habit) => {
        stats.categoryDistribution[habit.category] =
          (stats.categoryDistribution[habit.category] || 0) + 1;
      });
    }

    return stats;
  };

  return {
    habits,
    loading,
    error,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    getStatistics,
  };
};
