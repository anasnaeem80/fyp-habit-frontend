import React, { useState, useRef, useEffect } from "react";
import { Bell, User, Moon, Sun, Waves, Settings, LogOut } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import ProfileModal from "./ProfileModal";
import SettingsModal from "./SettingsModal";
import NotificationsModal from "./NotificationsModal";
import LogoutModal from "./LogoutModal";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Performing logout...");
    // Add your actual logout logic here
    // Example: auth.logout(), clear tokens, redirect to login
  };

  const notificationCount = 3; // Example notification count

  return (
    <>
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
          <div className='flex items-center space-x-4'>
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

            {/* Notifications Button */}
            <button
              onClick={() => setShowNotificationsModal(true)}
              className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative'
              aria-label='Notifications'
            >
              <Bell size={20} className='text-gray-600 dark:text-gray-400' />
              {notificationCount > 0 && (
                <span className='absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1'>
                  {notificationCount}
                </span>
              )}
            </button>

            {/* User Profile with Dropdown */}
            <div className='relative' ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full pl-1 pr-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
              >
                <div className='w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center'>
                  <User size={16} className='text-white' />
                </div>
                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Captain
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50'>
                  <button
                    onClick={() => {
                      setShowProfileModal(true);
                      setIsDropdownOpen(false);
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
                      setShowSettingsModal(true);
                      setIsDropdownOpen(false);
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

                  <div className='border-t border-gray-200 dark:border-gray-700 my-2'></div>

                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setIsDropdownOpen(false);
                    }}
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

      {/* Modals */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      <NotificationsModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
      />

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
