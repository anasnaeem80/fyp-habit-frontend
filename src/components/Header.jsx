import React from "react";
import { Bell, User, Moon, Sun, Waves } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className='ml-64 bg-white dark:bg-gray-800 p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 shadow-sm'>
      {/* Left side - Page Title */}
      <div className='flex items-center'>
        <Waves size={24} className='text-cyan-500 mr-2' />
        <h1 className='text-xl font-semibold text-gray-800 dark:text-white'>
          Habit Dashboard
        </h1>
      </div>

      {/* Right side - Actions */}
      <div className='flex items-center space-x-3'>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
          aria-label='Toggle dark mode'
        >
          {isDarkMode ? (
            <Sun size={20} className='text-amber-500' />
          ) : (
            <Moon size={20} className='text-gray-600 dark:text-gray-400' />
          )}
        </button>

        {/* User Profile */}
        <div className='flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full pl-1 pr-3 py-1'>
          <div className='w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center'>
            <User size={16} className='text-white' />
          </div>
          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Captain
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
