import React, { createContext, useContext, useState, useEffect } from "react";
import { useHabits } from "../hooks/useHabits";

const HabitsContext = createContext();

export const useHabitsContext = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabitsContext must be used within a HabitsProvider");
  }
  return context;
};

export const HabitsProvider = ({ children }) => {
  const habitsData = useHabits();

  const value = {
    ...habitsData,
  };

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
};
