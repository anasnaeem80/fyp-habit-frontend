import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StreakChart = ({ habits }) => {
  const data = habits.map((habit, index) => ({
    name: `Habit ${index + 1}`,
    streak: habit.currentStreak,
    record: habit.longestStreak,
  }));

  // Fallback data if no habits
  if (habits.length === 0) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-center text-gray-500'>
          <p>No streak data available</p>
          <p className='text-sm'>Add habits to track your streaks</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
          <XAxis
            dataKey='name'
            stroke='#64748b'
            fontSize={12}
            tick={{ fill: "#64748b" }}
          />
          <YAxis stroke='#64748b' fontSize={12} tick={{ fill: "#64748b" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e40af",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
          />
          <Line
            type='monotone'
            dataKey='streak'
            stroke='#0ea5e9'
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name='Current Streak'
          />
          <Line
            type='monotone'
            dataKey='record'
            stroke='#10b981'
            strokeWidth={2}
            strokeDasharray='5 5'
            name='Record Streak'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StreakChart;
