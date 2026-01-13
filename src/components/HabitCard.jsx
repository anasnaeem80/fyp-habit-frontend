import React, { useState } from "react";
import {
  CheckCircle,
  Circle,
  MoreVertical,
  Trash2,
  Edit,
  Waves,
  AlertTriangle,
} from "lucide-react";

const HabitCard = ({ habit, onToggle, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const completionRate =
    (habit.completion.filter(Boolean).length / habit.completion.length) * 100;

  const getDepthColor = (rate) => {
    if (rate >= 80) return "from-green-400 to-teal-500";
    if (rate >= 50) return "from-cyan-400 to-blue-500";
    if (rate >= 25) return "from-amber-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  const handleDelete = () => {
    onDelete(habit.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className='bg-gradient-to-br from-blue-900 to-blue-800 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-blue-700 dark:border-gray-700 relative'>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className='absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center z-10'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg max-w-xs text-center'>
            <AlertTriangle className='text-amber-500 mx-auto mb-3' size={32} />
            <h3 className='font-semibold text-gray-800 dark:text-white mb-2'>
              Delete Habit?
            </h3>
            <p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>
              Are you sure you want to delete "{habit.name}"? This action cannot
              be undone.
            </p>
            <div className='flex space-x-3'>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className='flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg text-sm'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='flex-1 py-2 bg-red-500 text-white rounded-lg text-sm'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='flex justify-between items-start mb-4'>
        <div>
          <h3 className='font-semibold text-lg text-white dark:text-gray-100'>
            {habit.name}
          </h3>
          <p className='text-blue-200 dark:text-gray-400 text-sm'>
            {habit.description}
          </p>
        </div>
        <div className='dropdown dropdown-end'>
          <label
            tabIndex={0}
            className='btn btn-ghost btn-sm btn-circle text-blue-300 hover:text-white dark:text-gray-400 dark:hover:text-white'
          >
            <MoreVertical size={16} />
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow bg-blue-800 dark:bg-gray-800 rounded-box w-52 border border-blue-700 dark:border-gray-700'
          >
            <li>
              <button
                onClick={() => onEdit(habit)}
                className='text-blue-200 hover:text-white hover:bg-blue-700 dark:text-gray-300 dark:hover:bg-gray-700'
              >
                <Edit size={14} /> Edit
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className='text-blue-200 hover:text-red-400 hover:bg-blue-700 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-700'
              >
                <Trash2 size={14} /> Delete
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className='mb-4'>
        <div className='flex justify-between text-sm text-blue-300 dark:text-gray-400 mb-2'>
          <span>Depth Achievement</span>
          <span>{Math.round(completionRate)}%</span>
        </div>
        <div className='w-full bg-blue-700 dark:bg-gray-700 rounded-full h-3'>
          <div
            className={`bg-gradient-to-r ${getDepthColor(
              completionRate
            )} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      <div className='flex justify-between items-center mb-4'>
        <div className='text-center'>
          <div className='text-xl font-bold text-cyan-300'>
            {habit.currentStreak}
          </div>
          <div className='text-xs text-blue-300 dark:text-gray-400'>
            Current Streak
          </div>
        </div>
        <div className='text-center'>
          <div className='text-xl font-bold text-green-400'>
            {habit.longestStreak}
          </div>
          <div className='text-xs text-blue-300 dark:text-gray-400'>
            Record Depth
          </div>
        </div>
        <div className='text-center'>
          <div className='text-xl font-bold text-amber-400'>{habit.goal}</div>
          <div className='text-xs text-blue-300 dark:text-gray-400'>Target</div>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex space-x-1'>
          {habit.completion.map((completed, index) => (
            <button
              key={index}
              onClick={() => onToggle(habit.id, index)}
              className='p-1 transform hover:scale-110 transition-transform'
            >
              {completed ? (
                <CheckCircle size={18} className='text-green-400' />
              ) : (
                <Circle
                  size={18}
                  className='text-blue-500 dark:text-gray-600'
                />
              )}
            </button>
          ))}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-700 dark:bg-gray-700 text-cyan-300 dark:text-cyan-400 border border-blue-600 dark:border-gray-600`}
        >
          <Waves size={12} className='inline mr-1' />
          {habit.category}
        </span>
      </div>
    </div>
  );
};

export default HabitCard;
