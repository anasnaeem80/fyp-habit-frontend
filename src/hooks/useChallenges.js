import { useState, useEffect } from "react";
import api from "../api/axios";

export const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch challenges
  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await api.get('/challenges');
      setChallenges(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching challenges:", err);
      setError("Failed to load challenges");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  // ADD challenge
  const addChallenge = async (challengeData) => {
    try {
      const response = await api.post('/challenges', {
        ...challengeData,
        progress: 0,
        completed: false,
        joined: false,
        participants: 1
      });
      await fetchChallenges();
      return response.data;
    } catch (err) {
      console.error("Error adding challenge:", err);
      setError(err.response?.data?.message || "Failed to add challenge");
      throw err;
    }
  };

  // JOIN challenge
  const joinChallenge = async (id) => {
    try {
      const response = await api.patch(`/challenges/${id}/join`);
      await fetchChallenges();
      return response.data;
    } catch (err) {
      console.error("Error joining challenge:", err);
      setError(err.response?.data?.message || "Failed to join challenge");
      throw err;
    }
  };

  // UPDATE progress
  const updateProgress = async (id, amount) => {
    try {
      const response = await api.patch(`/challenges/${id}/progress`, { amount });
      await fetchChallenges();
      return response.data;
    } catch (err) {
      console.error("Error updating progress:", err);
      setError(err.response?.data?.message || "Failed to update progress");
      throw err;
    }
  };

  // DELETE challenge
  const deleteChallenge = async (id) => {
    try {
      await api.delete(`/challenges/${id}`);
      await fetchChallenges();
    } catch (err) {
      console.error("Error deleting challenge:", err);
      setError(err.response?.data?.message || "Failed to delete challenge");
      throw err;
    }
  };

  return {
    challenges,
    loading,
    error,
    addChallenge,
    joinChallenge,
    updateProgress,
    deleteChallenge,
  };
};