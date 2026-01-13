import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Calendar,
  BarChart3,
  BookOpen,
  Trophy,
  Bot,
  Ship,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/setup", icon: PlusCircle, label: "Habit Setup" },
    { path: "/streak", icon: Calendar, label: "Streak Tracker" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/journal", icon: BookOpen, label: "Reflection Journal" },
    { path: "/challenges", icon: Trophy, label: "Challenges" },
    { path: "/ai-coach", icon: Bot, label: "AI Coach" },
  ];

  return (
    <div className='w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen fixed left-0 top-0 p-6 border-r border-blue-700'>
      {/* Submarine Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-center mb-4'>
          <div className='w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-3'>
            <Ship size={24} className='text-white' />
          </div>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
            DeepMotive
          </h1>
        </div>
        <div className='bg-blue-700 rounded-lg p-3'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm text-blue-200'>Depth:</span>
            <span className='font-semibold text-cyan-300'>1,240m</span>
          </div>
          <div className='w-full bg-blue-600 rounded-full h-2'>
            <div
              className='bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full'
              style={{ width: "65%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className='space-y-1'>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 shadow-lg"
                  : "text-blue-200 hover:bg-blue-700 hover:text-white"
              }`}
            >
              <Icon size={20} className={isActive ? "text-cyan-300" : ""} />
              <span className={isActive ? "font-semibold" : ""}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Submarine Status Footer */}
      <div className='absolute bottom-6 left-6 right-6'>
        <div className='bg-blue-700 rounded-lg p-3 border border-blue-600 text-center'>
          <div className='flex items-center justify-center mb-1'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2'></div>
            <span className='text-xs text-blue-300'>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
