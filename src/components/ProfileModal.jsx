import React from "react";
import { User, Mail, Calendar, Edit, X } from "lucide-react";

const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const userData = {
    name: "Captain",
    email: "captain@deepmotive.com",
    role: "Administrator",
    memberSince: "2023-01-15",
    streak: "42 days",
    habitsCompleted: "128",
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4'>
        {/* Modal Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700'>
          <div className='flex items-center space-x-3'>
            <div className='w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center'>
              <User size={24} className='text-white' />
            </div>
            <div>
              <h2 className='text-xl font-bold text-gray-800 dark:text-white'>
                {userData.name}
              </h2>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {userData.role}
              </p>
            </div>
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
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <Mail size={18} className='text-gray-500 dark:text-gray-400' />
              <div>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Email
                </p>
                <p className='text-gray-800 dark:text-white'>
                  {userData.email}
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-3'>
              <Calendar
                size={18}
                className='text-gray-500 dark:text-gray-400'
              />
              <div>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Member Since
                </p>
                <p className='text-gray-800 dark:text-white'>
                  {userData.memberSince}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 pt-4'>
              <div className='bg-gray-100 dark:bg-gray-700 rounded-lg p-4'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Current Streak
                </p>
                <p className='text-2xl font-bold text-cyan-600 dark:text-cyan-400'>
                  {userData.streak}
                </p>
              </div>
              <div className='bg-gray-100 dark:bg-gray-700 rounded-lg p-4'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Habits Completed
                </p>
                <p className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  {userData.habitsCompleted}
                </p>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className='w-full mt-6 flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white py-2.5 px-4 rounded-lg transition-colors'>
            <Edit size={18} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
