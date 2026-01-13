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
import { db } from "../firebase/config";

export const useJournal = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Real-time listener for journal entries
  useEffect(() => {
    const journalRef = collection(db, "journal");
    const q = query(journalRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const entriesData = [];
        snapshot.forEach((doc) => {
          entriesData.push({ id: doc.id, ...doc.data() });
        });
        setEntries(entriesData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching journal:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ADD new entry
  const addEntry = async (entryData) => {
    try {
      const journalRef = collection(db, "journal");
      const newEntry = {
        ...entryData,
        tags: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(journalRef, newEntry);
      return { id: docRef.id, ...newEntry };
    } catch (err) {
      console.error("Error adding journal entry:", err);
      setError(err.message);
      throw err;
    }
  };

  // UPDATE entry
  const updateEntry = async (id, entryData) => {
    try {
      const entryRef = doc(db, "journal", id);
      await updateDoc(entryRef, {
        ...entryData,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error updating journal entry:", err);
      setError(err.message);
      throw err;
    }
  };

  // DELETE entry
  const deleteEntry = async (id) => {
    try {
      const entryRef = doc(db, "journal", id);
      await deleteDoc(entryRef);
    } catch (err) {
      console.error("Error deleting journal entry:", err);
      setError(err.message);
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
