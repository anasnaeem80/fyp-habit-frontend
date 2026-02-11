import React, { useEffect, useState, useCallback } from "react";
import { useHabits } from "../hooks/useHabits";
import HabitCard from "./HabitCard";
import HabitCompletionChart from "../components/Charts/HabitCompletionChart";
import StreakChart from "../components/Charts/StreakChart";
import {
  Gauge,
  Waves,
  Target,
  Ship,
  Calendar,
  TrendingUp,
  RefreshCw,
  Filter,
  Search,
  Plus,
  Download,
  Upload,
  Settings,
  Bell,
  Users,
  Award,
  BarChart3,
  Trophy, // Add this import
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HabitDashboard = () => {
  const {
    habits,
    loading,
    error,
    toggleHabitCompletion,
    deleteHabit,
    addHabit,
    updateHabit,
  } = useHabits();

  const navigate = useNavigate();
  const [stats, setStats] = useState({
    completedToday: 0,
    totalCompletion: 0,
    averageStreak: 0,
    currentDepth: 0,
    totalHabits: 0,
    totalCompletions: 0,
    bestStreak: 0,
    consistencyRate: 0,
  });

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Calculate statistics
  useEffect(() => {
    if (habits.length > 0) {
      const completedToday = habits.filter(
        (habit) => habit.completion[new Date().getDay()],
      ).length;

      const totalCompletion =
        (habits.reduce((total, habit) => {
          return (
            total +
            habit.completion.filter(Boolean).length / habit.completion.length
          );
        }, 0) /
          habits.length) *
          100 || 0;

      const averageStreak =
        habits.reduce((sum, habit) => sum + habit.currentStreak, 0) /
          habits.length || 0;

      const currentDepth = Math.round(1240 * (totalCompletion / 100));

      const totalCompletions = habits.reduce((total, habit) => {
        return total + habit.completion.filter(Boolean).length;
      }, 0);

      const bestStreak = Math.max(...habits.map((h) => h.longestStreak), 0);

      const consistencyRate =
        habits.reduce((total, habit) => {
          return total + (habit.currentStreak / habit.goal) * 100;
        }, 0) / habits.length || 0;

      setStats({
        completedToday,
        totalCompletion,
        averageStreak,
        currentDepth,
        totalHabits: habits.length,
        totalCompletions,
        bestStreak,
        consistencyRate: Math.round(consistencyRate),
      });

      // Check for notifications
      const newNotifications = [];
      habits.forEach((habit) => {
        if (habit.currentStreak >= habit.goal) {
          newNotifications.push({
            id: habit.id,
            type: "goal",
            message: `🎯 You've reached your goal for "${habit.name}"!`,
          });
        }

        if (habit.currentStreak >= 7 && habit.currentStreak % 7 === 0) {
          newNotifications.push({
            id: habit.id + "-week",
            type: "milestone",
            message: `🏆 ${habit.currentStreak} day streak for "${habit.name}"!`,
          });
        }
      });
      setNotifications(newNotifications);
    } else {
      setStats({
        completedToday: 0,
        totalCompletion: 0,
        averageStreak: 0,
        currentDepth: 0,
        totalHabits: 0,
        totalCompletions: 0,
        bestStreak: 0,
        consistencyRate: 0,
      });
      setNotifications([]);
    }
  }, [habits]);

  // Handle day toggle for habits
  const handleToggleDay = useCallback(
    (habitId, dayIndex) => {
      toggleHabitCompletion(habitId, dayIndex);
    },
    [toggleHabitCompletion],
  );

  // Handle habit deletion
  const handleDeleteHabit = useCallback(
    (habitId) => {
      if (window.confirm("Are you sure you want to delete this habit?")) {
        deleteHabit(habitId);
      }
    },
    [deleteHabit],
  );

  // Handle habit editing - ADD THIS FUNCTION
  const handleEditHabit = useCallback((habit) => {
    console.log("Edit habit:", habit);
    // You can implement navigation to edit page or open a modal
    // navigate(`/edit-habit/${habit.id}`);
  }, []);

  // Handle adding new habit
  const handleAddHabit = () => {
    navigate("/setup");
  };

  // Filter habits based on filter and search
  const filteredHabits = habits.filter((habit) => {
    // Apply filter
    if (filter === "active" && !habit.active) return false;
    if (filter === "completed" && habit.currentStreak < habit.goal)
      return false;
    if (filter === "needs-attention" && habit.currentStreak >= 3) return false;

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        habit.name.toLowerCase().includes(query) ||
        habit.description.toLowerCase().includes(query) ||
        habit.category.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Handle data export
  const handleExportData = (format) => {
    const exportData = {
      habits: habits,
      stats: stats,
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `habits-export-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  // Handle data import
  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          console.log("Import data:", data);
          alert("Data imported successfully!");
        } catch (error) {
          console.error("Error importing data:", error);
          alert("Error importing data. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  // Toggle notification
  const toggleNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  if (loading) {
    return (
      <div className='p-6 flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-400'>
            Loading your habit fleet...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-6 text-center'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          Error: {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className='btn btn-primary'
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6 bg-gradient-to-b from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 min-h-screen'>
      {/* Header Section */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-blue-900 dark:text-white flex items-center'>
            <Ship size={32} className='mr-3 text-cyan-500' />
            DeepMotive
          </h1>
          <p className='text-blue-600 dark:text-gray-400 mt-2'>
            Tracking progress at {stats.currentDepth}m depth
          </p>
        </div>

        <div className='flex items-center space-x-4'>
          {/* Notifications */}
          {notifications.length > 0 && (
            <div className='relative'>
              <button
                className='p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'
                onClick={() => setShowSettings(!showSettings)}
              >
                <Bell size={20} className='text-gray-600 dark:text-gray-400' />
                {notifications.length > 0 && (
                  <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                    {notifications.length}
                  </span>
                )}
              </button>

              {showSettings && (
                <div className='absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700'>
                  <div className='p-4'>
                    <h3 className='font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                      Notifications
                    </h3>
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className='p-3 mb-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex justify-between items-center'
                      >
                        <span className='text-sm text-gray-600 dark:text-gray-300'>
                          {notif.message}
                        </span>
                        <button
                          onClick={() => toggleNotification(notif.id)}
                          className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Export/Import Menu */}
          <div className='relative'>
            <button
              className='p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <Download
                size={20}
                className='text-gray-600 dark:text-gray-400'
              />
            </button>

            {showExportMenu && (
              <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700'>
                <div className='py-2'>
                  <button
                    onClick={() => handleExportData("json")}
                    className='w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  >
                    Export as JSON
                  </button>
                  <button
                    onClick={() => handleExportData("csv")}
                    className='w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  >
                    Export as CSV
                  </button>
                  <div className='px-4 py-2'>
                    <label className='block text-sm text-gray-700 dark:text-gray-300 cursor-pointer'>
                      Import Data
                      <input
                        type='file'
                        accept='.json,.csv'
                        onChange={handleImportData}
                        className='hidden'
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Add New Habit Button */}
          <button
            onClick={handleAddHabit}
            className='flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all'
          >
            <Plus size={20} />
            <span>New Habit</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && !showSettings && (
        <div className='bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-xl'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-3'>
              <Award size={24} />
              <div>
                <p className='font-semibold'>Milestone Achieved!</p>
                <p className='text-sm opacity-90'>{notifications[0].message}</p>
              </div>
            </div>
            <button
              onClick={() => toggleNotification(notifications[0].id)}
              className='text-white hover:text-amber-200'
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid - Enhanced */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {/* Today's Completion */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center'>
              <Calendar
                size={24}
                className='text-green-600 dark:text-green-400'
              />
            </div>
            <span className='text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-2 py-1 rounded-full'>
              TODAY
            </span>
          </div>
          <p className='text-3xl font-bold text-green-600 dark:text-green-400 mb-1'>
            {stats.completedToday}/{stats.totalHabits}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Habits Completed Today
          </p>
        </div>

        {/* Total Completion */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center'>
              <Target size={24} className='text-blue-600 dark:text-blue-400' />
            </div>
            <span className='text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full'>
              OVERALL
            </span>
          </div>
          <p className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1'>
            {Math.round(stats.totalCompletion)}%
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Mission Completion Rate
          </p>
        </div>

        {/* Best Streak */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center'>
              <Trophy
                size={24}
                className='text-purple-600 dark:text-purple-400'
              />
            </div>
            <span className='text-xs font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full'>
              RECORD
            </span>
          </div>
          <p className='text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1'>
            {stats.bestStreak}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Longest Streak Record
          </p>
        </div>

        {/* Consistency */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center'>
              <TrendingUp
                size={24}
                className='text-amber-600 dark:text-amber-400'
              />
            </div>
            <span className='text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2 py-1 rounded-full'>
              CONSISTENCY
            </span>
          </div>
          <p className='text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1'>
            {stats.consistencyRate}%
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Goal Consistency Rate
          </p>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
        <div className='flex items-center space-x-4'>
          <div className='flex space-x-2 bg-white dark:bg-gray-800 p-1 rounded-lg'>
            {["all", "active", "completed", "needs-attention"].map(
              (filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === filterType
                      ? "bg-cyan-500 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() +
                    filterType.slice(1).replace("-", " ")}
                </button>
              ),
            )}
          </div>
        </div>

        <div className='relative w-full md:w-64'>
          <Search
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={20}
          />
          <input
            type='text'
            placeholder='Search habits...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-100 dark:border-gray-700'>
          <h3 className='text-lg font-semibold mb-4 flex items-center text-blue-900 dark:text-white'>
            <BarChart3 size={20} className='mr-2 text-cyan-500' />
            Depth Progress Analysis
          </h3>
          <HabitCompletionChart habits={habits} />
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-100 dark:border-gray-700'>
          <h3 className='text-lg font-semibold mb-4 flex items-center text-blue-900 dark:text-white'>
            <TrendingUp size={20} className='mr-2 text-cyan-500' />
            Expedition Streaks
          </h3>
          <StreakChart habits={habits} />
        </div>
      </div>

      {/* Habit Cards Section */}
      <div>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold text-blue-900 dark:text-white flex items-center'>
            <Ship size={24} className='mr-2 text-cyan-500' />
            Your Habit Fleet ({filteredHabits.length} of {habits.length})
          </h2>
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => window.location.reload()}
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
              title='Refresh'
            >
              <RefreshCw
                size={20}
                className='text-gray-600 dark:text-gray-400'
              />
            </button>
            <button
              onClick={() => navigate("/analytics")}
              className='flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all'
            >
              <BarChart3 size={20} />
              <span>Advanced Analytics</span>
            </button>
          </div>
        </div>

        {filteredHabits.length === 0 ? (
          <div className='bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-blue-100 dark:border-gray-700'>
            <div className='w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Filter size={32} className='text-blue-500 dark:text-blue-400' />
            </div>
            <h3 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>
              No Habits Found
            </h3>
            <p className='text-gray-500 dark:text-gray-400 mb-4'>
              {searchQuery
                ? `No habits match "${searchQuery}"`
                : `No habits match the "${filter}" filter`}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilter("all");
              }}
              className='text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium'
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={handleToggleDay}
                // onEdit={handleEditHabit} {/* Now this function exists */}
                onDelete={handleDeleteHabit}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {habits.length === 0 && (
          <div className='bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-blue-100 dark:border-gray-700'>
            <div className='w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Ship size={32} className='text-blue-500 dark:text-blue-400' />
            </div>
            <h3 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>
              No Active Missions
            </h3>
            <p className='text-gray-500 dark:text-gray-400 mb-4'>
              Start your journey by adding your first habit
            </p>
            <button onClick={handleAddHabit} className='btn btn-primary'>
              Create First Habit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitDashboard;
