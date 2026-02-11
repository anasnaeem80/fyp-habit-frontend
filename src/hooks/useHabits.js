import { useState, useEffect } from "react";
import api from "../api/axios";

export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch habits from MongoDB backend
  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await api.get('/habits');
      setHabits(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching habits:", err);
      setError("Failed to load habits. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // ADD new habit
  const addHabit = async (habitData) => {
    try {
      const response = await api.post('/habits', {
        ...habitData,
        completion: Array(7).fill(false),
        currentStreak: 0,
        longestStreak: 0
      });
      await fetchHabits(); // Refresh the list
      return response.data;
    } catch (err) {
      console.error("Error adding habit:", err);
      setError(err.response?.data?.message || "Failed to add habit");
      throw err;
    }
  };

  // DELETE habit
  const deleteHabit = async (id) => {
    try {
      await api.delete(`/habits/${id}`);
      await fetchHabits(); // Refresh the list
    } catch (err) {
      console.error("Error deleting habit:", err);
      setError(err.response?.data?.message || "Failed to delete habit");
      throw err;
    }
  };

  // TOGGLE habit completion
  const toggleHabitCompletion = async (id, day) => {
    try {
      const response = await api.patch(`/habits/${id}/toggle`, { day });
      await fetchHabits(); // Refresh the list
      return response.data;
    } catch (err) {
      console.error("Error toggling habit:", err);
      setError(err.response?.data?.message || "Failed to update habit");
      throw err;
    }
  };

  // GET statistics
  const getStatistics = async () => {
    try {
      const response = await api.get('/habits/stats/overview');
      return response.data;
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError(err.response?.data?.message || "Failed to fetch statistics");
      throw err;
    }
  };

  return {
    habits,
    loading,
    error,
    addHabit,
    deleteHabit,
    toggleHabitCompletion,
    getStatistics,
    refreshHabits: fetchHabits,
  };
};