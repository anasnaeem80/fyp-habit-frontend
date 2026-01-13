import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Real-time listener for challenges
  useEffect(() => {
    const challengesRef = collection(db, "challenges");
    const q = query(challengesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const challengesData = [];
        snapshot.forEach((doc) => {
          challengesData.push({ id: doc.id, ...doc.data() });
        });
        setChallenges(challengesData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching challenges:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ADD new challenge
  const addChallenge = async (challengeData) => {
    try {
      const challengesRef = collection(db, "challenges");
      const newChallenge = {
        ...challengeData,
        progress: 0,
        completed: false,
        joined: false,
        participants: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(challengesRef, newChallenge);
      return { id: docRef.id, ...newChallenge };
    } catch (err) {
      console.error("Error adding challenge:", err);
      setError(err.message);
      throw err;
    }
  };

  // UPDATE challenge
  const updateChallenge = async (id, challengeData) => {
    try {
      const challengeRef = doc(db, "challenges", id);
      await updateDoc(challengeRef, {
        ...challengeData,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error updating challenge:", err);
      setError(err.message);
      throw err;
    }
  };

  // DELETE challenge
  const deleteChallenge = async (id) => {
    try {
      const challengeRef = doc(db, "challenges", id);
      await deleteDoc(challengeRef);
    } catch (err) {
      console.error("Error deleting challenge:", err);
      setError(err.message);
      throw err;
    }
  };

  // JOIN challenge
  const joinChallenge = async (id) => {
    try {
      const challengeRef = doc(db, "challenges", id);
      await updateDoc(challengeRef, {
        joined: true,
        participants: increment(1),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error joining challenge:", err);
      setError(err.message);
      throw err;
    }
  };

  // UPDATE progress
  const updateProgress = async (id, amount) => {
    try {
      const challenge = challenges.find((c) => c.id === id);
      if (!challenge) return;

      const newProgress = Math.max(
        0,
        Math.min(challenge.progress + amount, challenge.duration)
      );
      const completed = newProgress >= challenge.duration;

      const challengeRef = doc(db, "challenges", id);
      await updateDoc(challengeRef, {
        progress: newProgress,
        completed,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error updating progress:", err);
      setError(err.message);
      throw err;
    }
  };

  return {
    challenges,
    loading,
    error,
    addChallenge,
    updateChallenge,
    deleteChallenge,
    joinChallenge,
    updateProgress,
  };
};
