import React from "react";
import { LogOut, X, AlertTriangle } from "lucide-react";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  const handleLogout = () => {
    console.log("User logged out");
    onLogout();
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4'>
        {/* Modal Header */}
        <div className='p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
          <div className='flex items-center space-x-3'>
            <div className='p-2 bg-red-100 dark:bg-red-900/30 rounded-full'>
              <AlertTriangle
                className='text-red-600 dark:text-red-400'
                size={20}
              />
            </div>
            <h2 className='text-xl font-bold text-gray-800 dark:text-white'>
              Logout
            </h2>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors'
          >
            <X size={20} className='text-gray-500 dark:text-gray-400' />
          </button>
        </div>

        {/* Modal Content */}
        <div className='p-6'>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            Are you sure you want to logout? Any unsaved changes will be lost.
          </p>

          <div className='space-y-3'>
            <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
              <div className='w-2 h-2 bg-cyan-500 rounded-full'></div>
              <span>
                Your current streak: <strong>42 days</strong>
              </span>
            </div>
            <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
              <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
              <span>
                Active habits: <strong>3 habits</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className='p-6 border-t border-gray-200 dark:border-gray-700 flex space-x-3'>
          <button
            onClick={onClose}
            className='flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className='flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2'
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
