import React from "react";
import HabitCard from "./HabitCard";

const HabitSetup = () => {
  // This is a placeholder - you need to implement your actual HabitSetup page
  // For now, let's create a simple version that demonstrates using HabitCard

  const sampleHabit = {
    id: "1",
    name: "Sample Habit",
    description: "This is a sample habit",
    category: "Health",
    completion: [true, false, true, false, true, false, false],
    currentStreak: 3,
    longestStreak: 5,
    goal: 30,
  };

  const handleToggle = (habitId, dayIndex) => {
    console.log("Toggle habit:", habitId, "day:", dayIndex);
  };

  const handleEdit = (habit) => {
    console.log("Edit habit:", habit);
  };

  const handleDelete = (habitId) => {
    console.log("Delete habit:", habitId);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold text-white mb-6'>Habit Setup</h1>
      <div className='space-y-4'>
        <HabitCard
          habit={sampleHabit}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default HabitSetup;
