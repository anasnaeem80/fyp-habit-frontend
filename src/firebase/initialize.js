import { app, db } from "./config";

export const initializeFirebase = async () => {
  try {
    console.log("🔥 Firebase initialized successfully");
    return { app, db };
  } catch (error) {
    console.error("❌ Error initializing Firebase:", error);
    throw error;
  }
};
