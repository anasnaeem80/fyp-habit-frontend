import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  Moon,
  Sun,
  Waves,
  Settings,
  LogOut,
  User,
  Shield,
} from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsSettingsOpen(false);
    // Add your logout logic here
  };

  return (
    <header className='sticky top-0 z-40 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
      <div className='flex justify-between items-center'>
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

          {/* Notifications */}
          <button
            className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative'
            aria-label='Notifications'
          >
            <Bell size={20} className='text-gray-600 dark:text-gray-400' />
            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>

          {/* Settings Button with Dropdown */}
          <div className='relative' ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className='flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full pl-3 pr-4 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
              aria-label='Settings'
            >
              <div className='w-7 h-7 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center'>
                <User size={14} className='text-white' />
              </div>
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Captain
              </span>
              <Settings
                size={16}
                className='text-gray-500 dark:text-gray-400'
              />
            </button>

            {/* Settings Dropdown Menu */}
            {isSettingsOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50'>
                <button
                  onClick={() => {
                    console.log("Profile clicked");
                    setIsSettingsOpen(false);
                  }}
                  className='w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3'
                >
                  <User
                    size={18}
                    className='text-gray-600 dark:text-gray-400'
                  />
                  <span className='text-gray-700 dark:text-gray-300'>
                    My Profile
                  </span>
                </button>

                <button
                  onClick={() => {
                    console.log("Settings clicked");
                    setIsSettingsOpen(false);
                  }}
                  className='w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3'
                >
                  <Settings
                    size={18}
                    className='text-gray-600 dark:text-gray-400'
                  />
                  <span className='text-gray-700 dark:text-gray-300'>
                    Settings
                  </span>
                </button>

                <button
                  onClick={() => {
                    console.log("Privacy clicked");
                    setIsSettingsOpen(false);
                  }}
                  className='w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3'
                >
                  <Shield
                    size={18}
                    className='text-gray-600 dark:text-gray-400'
                  />
                  <span className='text-gray-700 dark:text-gray-300'>
                    Privacy
                  </span>
                </button>

                <div className='border-t border-gray-200 dark:border-gray-700 my-1'></div>

                <button
                  onClick={handleLogout}
                  className='w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-3 text-red-600 dark:text-red-400'
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
