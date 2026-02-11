import React, { useState, useRef, useEffect } from "react";
import {
  CheckCircle,
  Circle,
  MoreVertical,
  Trash2,
  Edit,
  Waves,
  AlertTriangle,
  X,
  ChevronRight,
  Flame,
  Target,
  Trophy,
  Calendar,
} from "lucide-react";

const HabitCard = ({ habit, onToggle, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Add defensive defaults for habit properties
  const safeHabit = {
    id: habit?.id,
    name: habit?.name || "Unnamed Habit",
    description: habit?.description || "",
    category: habit?.category || "Uncategorized",
    completion: Array.isArray(habit?.completion) ? habit.completion : [],
    currentStreak: habit?.currentStreak || 0,
    longestStreak: habit?.longestStreak || 0,
    goal: habit?.goal || 0,
  };

  // Calculate completion rate from the completion array
  const completionRate =
    safeHabit.completion.length > 0
      ? (safeHabit.completion.filter(Boolean).length /
          safeHabit.completion.length) *
        100
      : 0;

  // Get day names for the completion buttons
  const getDayLabel = (index) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    return days[index % 7];
  };

  // Get tooltip text for each day
  const getDayTooltip = (index, completed) => {
    const daysAgo = safeHabit.completion.length - index - 1;
    const status = completed ? "Completed" : "Not completed";
    return `Day ${index + 1}: ${status}`;
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDepthColor = (rate) => {
    if (rate >= 80) return "from-emerald-400 to-teal-500";
    if (rate >= 50) return "from-cyan-400 to-blue-500";
    if (rate >= 25) return "from-amber-400 to-orange-500";
    return "from-rose-400 to-pink-500";
  };

  const getStatusColor = (rate) => {
    if (rate >= 80) return "text-emerald-400";
    if (rate >= 50) return "text-cyan-400";
    if (rate >= 25) return "text-amber-400";
    return "text-rose-400";
  };

  const getProgressBg = (rate) => {
    if (rate >= 80) return "bg-emerald-500/20";
    if (rate >= 50) return "bg-cyan-500/20";
    if (rate >= 25) return "bg-amber-500/20";
    return "bg-rose-500/20";
  };

  const handleDelete = () => {
    if (onDelete && safeHabit.id) {
      onDelete(safeHabit.id);
    }
    setShowDeleteConfirm(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Handle day toggle
  const handleDayToggle = (dayIndex) => {
    console.log("Toggling day:", dayIndex, "for habit:", safeHabit.id);

    // Call the parent's onToggle function
    if (onToggle && safeHabit.id) {
      onToggle(safeHabit.id, dayIndex);
    } else {
      console.error(
        "onToggle function is not provided or habit id is missing!",
      );
    }
  };

  // Calculate completed days
  const completedDays = safeHabit.completion.filter(Boolean).length;
  const totalDays = safeHabit.completion.length;

  return (
    <div className='relative group'>
      {/* Main Card */}
      <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-cyan-500/30 relative overflow-hidden'>
        {/* Subtle background pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:20px_20px]'></div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className='absolute inset-0 bg-black/90 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50 animate-fadeIn'>
            <div className='bg-gray-800 p-6 rounded-2xl max-w-xs w-full mx-4 border border-gray-700 shadow-2xl'>
              <div className='flex items-center justify-center mb-4'>
                <div className='p-3 bg-rose-500/10 rounded-full'>
                  <AlertTriangle className='text-rose-400' size={28} />
                </div>
              </div>
              <h3 className='font-semibold text-white text-center mb-2 text-lg'>
                Delete Habit
              </h3>
              <p className='text-gray-300 text-sm text-center mb-6'>
                Are you sure you want to delete "
                <span className='text-cyan-300'>{safeHabit.name}</span>"? This
                action cannot be undone.
              </p>
              <div className='flex space-x-3'>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className='flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-xl text-sm font-medium transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className='flex-1 py-3 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white rounded-xl text-sm font-medium transition-all transform hover:scale-[1.02] shadow-lg shadow-rose-500/20'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header with title and menu */}
        <div className='flex justify-between items-start mb-6 relative z-10'>
          <div className='flex-1 pr-4'>
            <div className='flex items-center gap-2 mb-2'>
              <h3 className='font-bold text-xl text-white tracking-tight'>
                {safeHabit.name}
              </h3>
              <span className='px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-lg'>
                {completedDays}/{totalDays} days
              </span>
            </div>
            <p className='text-gray-400 text-sm leading-relaxed'>
              {safeHabit.description}
            </p>
          </div>

          {/* Menu Button and Dropdown */}
          <div className='relative' ref={menuRef}>
            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className='p-2 hover:bg-gray-700/50 rounded-xl transition-all duration-200 hover:rotate-90 active:scale-95 group/menu'
            >
              <MoreVertical
                size={20}
                className='text-gray-400 group-hover/menu:text-cyan-400 transition-colors'
              />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className='absolute right-0 top-12 w-48 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 py-2 z-50 animate-scaleIn origin-top-right'>
                <div className='absolute -top-2 right-3 w-4 h-4 bg-gray-800 border-t border-l border-gray-700 rotate-45'></div>
                <button
                  onClick={() => {
                    if (onEdit) {
                      onEdit(safeHabit);
                    }
                    setShowMenu(false);
                  }}
                  className='w-full px-4 py-3 flex items-center space-x-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-700/50 transition-all group/edit'
                >
                  <div className='p-1.5 bg-cyan-500/10 rounded-lg group-hover/edit:bg-cyan-500/20 transition-colors'>
                    <Edit size={16} className='text-cyan-400' />
                  </div>
                  <span className='font-medium'>Edit Habit</span>
                  <ChevronRight
                    size={16}
                    className='ml-auto opacity-0 group-hover/edit:opacity-100 transition-opacity'
                  />
                </button>
                <div className='h-px bg-gray-700 my-1'></div>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setShowMenu(false);
                  }}
                  className='w-full px-4 py-3 flex items-center space-x-3 text-gray-300 hover:text-rose-400 hover:bg-gray-700/50 transition-all group/delete'
                >
                  <div className='p-1.5 bg-rose-500/10 rounded-lg group-hover/delete:bg-rose-500/20 transition-colors'>
                    <Trash2 size={16} className='text-rose-400' />
                  </div>
                  <span className='font-medium'>Delete</span>
                  <ChevronRight
                    size={16}
                    className='ml-auto opacity-0 group-hover/delete:opacity-100 transition-opacity'
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className='mb-6 relative z-10'>
          <div className='flex justify-between items-center mb-3'>
            <div className='flex items-center gap-2'>
              <Calendar size={16} className='text-gray-400' />
              <span className='text-sm font-medium text-gray-400'>
                Daily Completion
              </span>
            </div>
            <span
              className={`text-sm font-bold ${getStatusColor(completionRate)}`}
            >
              {Math.round(completionRate)}%
            </span>
          </div>
          <div
            className={`h-3 rounded-full ${getProgressBg(completionRate)} overflow-hidden`}
          >
            <div
              className={`h-full bg-gradient-to-r ${getDepthColor(
                completionRate,
              )} rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-3 gap-4 mb-6 relative z-10'>
          <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700 hover:border-amber-500/30 transition-all group/stat'>
            <div className='flex items-center justify-center mb-2'>
              <div className='p-2 bg-amber-500/10 rounded-lg group-hover/stat:bg-amber-500/20 transition-colors'>
                <Flame size={18} className='text-amber-400' />
              </div>
            </div>
            <div className='text-2xl font-bold text-amber-400 mb-1'>
              {safeHabit.currentStreak}
            </div>
            <div className='text-xs text-gray-400 font-medium'>
              Current Streak
            </div>
          </div>

          <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700 hover:border-emerald-500/30 transition-all group/stat'>
            <div className='flex items-center justify-center mb-2'>
              <div className='p-2 bg-emerald-500/10 rounded-lg group-hover/stat:bg-emerald-500/20 transition-colors'>
                <Trophy size={18} className='text-emerald-400' />
              </div>
            </div>
            <div className='text-2xl font-bold text-emerald-400 mb-1'>
              {safeHabit.longestStreak}
            </div>
            <div className='text-xs text-gray-400 font-medium'>
              Record Depth
            </div>
          </div>

          <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700 hover:border-rose-500/30 transition-all group/stat'>
            <div className='flex items-center justify-center mb-2'>
              <div className='p-2 bg-rose-500/10 rounded-lg group-hover/stat:bg-rose-500/20 transition-colors'>
                <Target size={18} className='text-rose-400' />
              </div>
            </div>
            <div className='text-2xl font-bold text-rose-400 mb-1'>
              {safeHabit.goal}
            </div>
            <div className='text-xs text-gray-400 font-medium'>Target</div>
          </div>
        </div>

        {/* Daily Completion Checkboxes */}
        <div className='mb-6 relative z-10'>
          <div className='flex justify-between items-center mb-3'>
            <span className='text-sm font-medium text-gray-400'>
              Day by Day Progress
            </span>
            <span className='text-xs text-gray-500'>
              {completedDays} of {totalDays} completed
            </span>
          </div>

          <div className='grid grid-cols-7 gap-2'>
            {safeHabit.completion.length > 0 ? (
              safeHabit.completion.map((completed, index) => (
                <div key={index} className='relative group/day'>
                  <button
                    onClick={() => handleDayToggle(index)}
                    className='w-full aspect-square rounded-lg transition-all duration-200 flex flex-col items-center justify-center relative overflow-hidden active:scale-95'
                  >
                    {/* Background based on completion status */}
                    <div
                      className={`absolute inset-1 rounded-md transition-all duration-300 ${
                        completed
                          ? "bg-emerald-500/20 group-hover/day:bg-emerald-500/30"
                          : "bg-gray-700/50 group-hover/day:bg-gray-600/70"
                      }`}
                    ></div>

                    {/* Glow effect on hover */}
                    <div
                      className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                        completed
                          ? "bg-emerald-500/10 opacity-0 group-hover/day:opacity-100"
                          : "bg-cyan-500/10 opacity-0 group-hover/day:opacity-100"
                      }`}
                    ></div>

                    {/* Day number */}
                    <div
                      className={`text-xs font-semibold mb-1 relative z-10 ${
                        completed ? "text-emerald-300" : "text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Check/circle icon */}
                    <div className='relative z-10'>
                      {completed ? (
                        <CheckCircle
                          size={16}
                          className='text-emerald-400 drop-shadow-lg'
                        />
                      ) : (
                        <Circle
                          size={16}
                          className='text-gray-500 group-hover/day:text-cyan-400 transition-colors'
                        />
                      )}
                    </div>

                    {/* Day label (S, M, T, etc.) */}
                    <div
                      className={`text-[10px] font-medium mt-1 relative z-10 ${
                        completed ? "text-emerald-300/80" : "text-gray-500"
                      }`}
                    >
                      {getDayLabel(index)}
                    </div>
                  </button>

                  {/* Tooltip */}
                  <div className='absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover/day:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 border border-gray-700 shadow-lg'>
                    {getDayTooltip(index, completed)}
                    <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-800 rotate-45 border-b border-r border-gray-700'></div>
                  </div>
                </div>
              ))
            ) : (
              <div className='col-span-7 text-center py-4 text-gray-400 text-sm'>
                No completion data available
              </div>
            )}
          </div>
        </div>

        {/* Category */}
        <div className='relative z-10'>
          <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 space-x-2 group/category hover:border-cyan-500/50 transition-colors'>
            <Waves
              size={14}
              className='text-cyan-400 group-hover/category:text-cyan-300 transition-colors'
            />
            <span className='text-sm font-medium text-cyan-300 group-hover/category:text-cyan-200 transition-colors'>
              {safeHabit.category}
            </span>
          </div>
        </div>
      </div>

      {/* Add these animations to your global CSS or Tailwind config */}
      <style>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
  .animate-scaleIn {
    animation: scaleIn 0.2s ease-out;
  }
`}</style>
    </div>
  );
};

export default HabitCard;
