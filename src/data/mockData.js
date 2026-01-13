export const habits = [
  {
    _id: "1",
    name: "Morning Meditation",
    description: "10 minutes of meditation every morning",
    category: "Wellness",
    color: "bg-blue-500",
    frequency: "daily",
    goal: 7,
    completion: [true, true, false, true, false, false, false],
    currentStreak: 3,
    longestStreak: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    name: "Evening Workout",
    description: "30 minutes of exercise",
    category: "Fitness",
    color: "bg-green-500",
    frequency: "daily",
    goal: 5,
    completion: [true, true, true, true, false, false, false],
    currentStreak: 4,
    longestStreak: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const challenges = [
  {
    id: "1",
    title: "7-Day Meditation Challenge",
    description: "Meditate for 10 minutes every day for 7 days",
    duration: 7,
    goal: "Complete daily meditation",
    participants: 15,
    progress: 3,
    completed: false,
    joined: true,
    category: "Mindfulness",
    difficulty: "Easy",
  },
  {
    id: "2",
    title: "30-Day Fitness Journey",
    description: "Exercise for 30 minutes daily",
    duration: 30,
    goal: "Build exercise consistency",
    participants: 42,
    progress: 0,
    completed: false,
    joined: false,
    category: "Fitness",
    difficulty: "Medium",
  },
];

export const journalEntries = [
  {
    id: "1",
    content:
      "Today I meditated for 10 minutes. Feeling calm and focused for the day ahead.",
    mood: "happy",
    date: new Date(Date.now() - 86400000),
    tags: ["meditation", "morning"],
  },
  {
    id: "2",
    content: "Missed my workout today. Need to plan better for tomorrow.",
    mood: "sad",
    date: new Date(Date.now() - 2 * 86400000),
    tags: ["workout", "planning"],
  },
];
