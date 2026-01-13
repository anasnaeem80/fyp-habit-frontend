import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HabitsProvider } from "./context/HabitsContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import Sidebar from "./components/Sidebar";
import HeaderTemp from "./components/HeaderTemp";
import HabitDashboard from "./pages/HabitDashboard";
import HabitSetup from "./pages/HabitSetup";
import Analytics from "./pages/Analytics";
import AICoach from "./pages/AICoach";
import Challenges from "./pages/Challenges";
import ReflectionJournal from "./pages/ReflectionJournal";
import StreakTracker from "./pages/StreakTracker";

function App() {
  return (
    <DarkModeProvider>
      <HabitsProvider>
        <Router>
          <div className='flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
            <Sidebar />
            <div className='ml-64 flex-1 flex flex-col'>
              <HeaderTemp />
              <main className='flex-1 p-6 transition-colors duration-200'>
                <Routes>
                  <Route path='/' element={<HabitDashboard />} />
                  <Route path='/dashboard' element={<HabitDashboard />} />
                  <Route path='/setup' element={<HabitSetup />} />
                  <Route path='/analytics' element={<Analytics />} />
                  <Route path='/ai-coach' element={<AICoach />} />
                  <Route path='/challenges' element={<Challenges />} />
                  <Route path='/journal' element={<ReflectionJournal />} />
                  <Route path='/streak' element={<StreakTracker />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </HabitsProvider>
    </DarkModeProvider>
  );
}

export default App;
