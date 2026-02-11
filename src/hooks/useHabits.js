import { useEffect, useState } from "react";
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
import { db } from "../config";

export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================
  // REALTIME LISTENER
  // =========================
  useEffect(() => {
    const q = query(collection(db, "habits"), orderBy("createdAt", "desc"));
    // Add this function after the useEffect hook
    const handleEditHabit = (habit) => {
      // You need to implement edit functionality or navigate to edit page
      console.log("Edit habit:", habit);
      // For example, you could navigate to an edit page:
      // navigate(`/edit-habit/${habit.id}`);
    };
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHabits(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Failed to load habits");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  // =========================
  // ADD HABIT
  // =========================
  const addHabit = async (habitData) => {
    await addDoc(collection(db, "habits"), {
      ...habitData,
      completion: Array(7).fill(false),
      currentStreak: 0,
      longestStreak: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  // =========================
  // DELETE HABIT  ✅ FIXED
  // =========================
  const deleteHabit = async (id) => {
    const ref = doc(db, "habits", id);
    await deleteDoc(ref);
  };

  // =========================
  // TOGGLE COMPLETION
  // =========================
  const toggleHabitCompletion = async (id, dayIndex) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    const completion = [...habit.completion];
    completion[dayIndex] = !completion[dayIndex];

    // calculate streak
    let streak = 0;
    for (let i = completion.length - 1; i >= 0; i--) {
      if (completion[i]) streak++;
      else break;
    }

    const ref = doc(db, "habits", id);
    await updateDoc(ref, {
      completion,
      currentStreak: streak,
      longestStreak: Math.max(habit.longestStreak, streak),
      updatedAt: serverTimestamp(),
    });
  };

  // =========================
  // RETURN API
  // =========================
  return {
    habits,
    loading,
    error,
    addHabit,
    deleteHabit, // ✅ NOW DEFINED
    toggleHabitCompletion,
  };
};
