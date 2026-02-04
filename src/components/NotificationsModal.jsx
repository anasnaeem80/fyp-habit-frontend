import React from "react";
import { X, Bell, CheckCircle, AlertCircle, Info, Clock } from "lucide-react";

const NotificationsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Habit Completed",
      message: 'You completed "Morning Meditation" today!',
      time: "10 min ago",
      read: false,
      icon: CheckCircle,
    },
    {
      id: 2,
      type: "warning",
      title: "Streak Warning",
      message: "Your exercise streak is about to break!",
      time: "2 hours ago",
      read: true,
      icon: AlertCircle,
    },
    {
      id: 3,
      type: "info",
      title: "New Feature",
      message: "Try our new analytics dashboard",
      time: "1 day ago",
      read: true,
      icon: Info,
    },
    {
      id: 4,
      type: "reminder",
      title: "Reminder",
      message: "Time to log your evening reading",
      time: "Just now",
      read: false,
      icon: Clock,
    },
  ];

  const markAllAsRead = () => {
    console.log("Marking all as read");
  };

  const clearAll = () => {
    console.log("Clearing all notifications");
  };

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-end pt-16'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 border border-gray-200 dark:border-gray-700'>
        {/* Modal Header */}
        <div className='p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
          <div className='flex items-center space-x-3'>
            <Bell className='text-cyan-500' size={20} />
            <h2 className='font-bold text-gray-800 dark:text-white'>
              Notifications
            </h2>
            <span className='bg-cyan-500 text-white text-xs px-2 py-1 rounded-full'>
              {notifications.filter((n) => !n.read).length} new
            </span>
          </div>
          <div className='flex items-center space-x-2'>
            <button
              onClick={markAllAsRead}
              className='text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700'
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
            >
              <X size={18} className='text-gray-500 dark:text-gray-400' />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className='max-h-96 overflow-y-auto'>
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const Icon = notification.icon;
              const isUnread = !notification.read;

              return (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                    isUnread ? "bg-cyan-50 dark:bg-cyan-900/10" : ""
                  }`}
                >
                  <div className='flex items-start space-x-3'>
                    <div
                      className={`p-2 rounded-full ${
                        isUnread
                          ? "bg-cyan-100 dark:bg-cyan-900"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`${
                          notification.type === "success"
                            ? "text-green-500"
                            : notification.type === "warning"
                            ? "text-amber-500"
                            : "text-blue-500"
                        }`}
                      />
                    </div>
                    <div className='flex-1'>
                      <div className='flex justify-between items-start'>
                        <h3 className='font-medium text-gray-800 dark:text-white'>
                          {notification.title}
                        </h3>
                        <span className='text-xs text-gray-500 dark:text-gray-400'>
                          {notification.time}
                        </span>
                      </div>
                      <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                        {notification.message}
                      </p>
                    </div>
                    {isUnread && (
                      <div className='w-2 h-2 bg-cyan-500 rounded-full mt-2'></div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className='p-8 text-center'>
              <Bell
                size={48}
                className='text-gray-300 dark:text-gray-600 mx-auto mb-4'
              />
              <p className='text-gray-500 dark:text-gray-400'>
                No notifications yet
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
          <button
            onClick={clearAll}
            className='w-full py-2 text-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors'
          >
            Clear All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
