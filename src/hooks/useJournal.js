import { useState, useEffect } from "react";
import api from "../api/axios";

export const useJournal = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch journal entries
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await api.get('/journal');
      setEntries(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching journal entries:", err);
      setError("Failed to load journal entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // ADD entry
  const addEntry = async (entryData) => {
    try {
      const response = await api.post('/journal', {
        ...entryData,
        date: new Date()
      });
      await fetchEntries();
      return response.data;
    } catch (err) {
      console.error("Error adding journal entry:", err);
      setError(err.response?.data?.message || "Failed to add journal entry");
      throw err;
    }
  };

  // UPDATE entry
  const updateEntry = async (id, entryData) => {
    try {
      const response = await api.put(`/journal/${id}`, entryData);
      await fetchEntries();
      return response.data;
    } catch (err) {
      console.error("Error updating journal entry:", err);
      setError(err.response?.data?.message || "Failed to update journal entry");
      throw err;
    }
  };

  // DELETE entry
  const deleteEntry = async (id) => {
    try {
      await api.delete(`/journal/${id}`);
      await fetchEntries();
    } catch (err) {
      console.error("Error deleting journal entry:", err);
      setError(err.response?.data?.message || "Failed to delete journal entry");
      throw err;
    }
  };

  return {
    entries,
    loading,
    error,
    addEntry,
    updateEntry,
    deleteEntry,
  };
};