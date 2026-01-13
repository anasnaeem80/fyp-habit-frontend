import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HabitCompletionChart = ({ habits }) => {
  const data = habits.map((habit) => ({
    name: habit.name.substring(0, 12) + (habit.name.length > 12 ? "..." : ""),
    completion:
      (habit.completion.filter(Boolean).length / habit.completion.length) * 100,
    currentStreak: habit.currentStreak,
  }));

  // Fallback data if no habits
  if (habits.length === 0) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-center text-gray-500'>
          <p>No habits data available</p>
          <p className='text-sm'>Add habits to see your completion chart</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
          <XAxis
            dataKey='name'
            stroke='#64748b'
            fontSize={12}
            tick={{ fill: "#64748b" }}
          />
          <YAxis stroke='#64748b' fontSize={12} tick={{ fill: "#64748b" }} />
          <Tooltip
            formatter={(value) => [`${Math.round(value)}%`, "Completion Rate"]}
            contentStyle={{
              backgroundColor: "#1e40af",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
          />
          <Bar
            dataKey='completion'
            fill='#0ea5e9'
            radius={[4, 4, 0, 0]}
            name='Completion Rate'
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitCompletionChart;
