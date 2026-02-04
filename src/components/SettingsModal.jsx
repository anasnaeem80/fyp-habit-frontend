import React, { useState } from "react";
import { X, Bell, Lock, Globe, Palette, Volume2, Shield } from "lucide-react";

const SettingsModal = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    darkMode: false,
    autoSave: true,
    language: "en",
    privacyMode: false,
  });

  if (!isOpen) return null;

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelect = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto'>
        {/* Modal Header */}
        <div className='sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
          <h2 className='text-xl font-bold text-gray-800 dark:text-white'>
            Account Settings
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors'
          >
            <X size={20} className='text-gray-500 dark:text-gray-400' />
          </button>
        </div>

        {/* Settings Content */}
        <div className='p-6 space-y-6'>
          {/* Notifications Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <Bell className='text-gray-500 dark:text-gray-400' size={20} />
              <h3 className='font-semibold text-gray-800 dark:text-white'>
                Notifications
              </h3>
            </div>

            <div className='space-y-3 pl-8'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-700 dark:text-gray-300'>
                  Push Notifications
                </span>
                <button
                  onClick={() => handleToggle("notifications")}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    settings.notifications
                      ? "bg-cyan-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.notifications ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className='flex justify-between items-center'>
                <span className='text-gray-700 dark:text-gray-300'>
                  Email Notifications
                </span>
                <button
                  onClick={() => handleToggle("emailNotifications")}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    settings.emailNotifications
                      ? "bg-cyan-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.emailNotifications
                        ? "translate-x-6"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <Palette className='text-gray-500 dark:text-gray-400' size={20} />
              <h3 className='font-semibold text-gray-800 dark:text-white'>
                Appearance
              </h3>
            </div>

            <div className='space-y-3 pl-8'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-700 dark:text-gray-300'>
                  Dark Mode
                </span>
                <button
                  onClick={() => handleToggle("darkMode")}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    settings.darkMode
                      ? "bg-cyan-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.darkMode ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <Shield className='text-gray-500 dark:text-gray-400' size={20} />
              <h3 className='font-semibold text-gray-800 dark:text-white'>
                Privacy
              </h3>
            </div>

            <div className='space-y-3 pl-8'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-700 dark:text-gray-300'>
                  Private Mode
                </span>
                <button
                  onClick={() => handleToggle("privacyMode")}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    settings.privacyMode
                      ? "bg-cyan-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.privacyMode ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Language Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <Globe className='text-gray-500 dark:text-gray-400' size={20} />
              <h3 className='font-semibold text-gray-800 dark:text-white'>
                Language
              </h3>
            </div>

            <div className='pl-8'>
              <select
                value={settings.language}
                onChange={(e) => handleSelect("language", e.target.value)}
                className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white'
              >
                <option value='en'>English</option>
                <option value='es'>Español</option>
                <option value='fr'>Français</option>
                <option value='de'>Deutsch</option>
                <option value='ja'>日本語</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className='pt-4'>
            <button className='w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-lg font-medium transition-colors'>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
