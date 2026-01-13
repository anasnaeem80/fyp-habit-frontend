import React, { useState } from "react";
import { useChallenges } from "../hooks/useChallenges";
import {
  Trophy,
  Users,
  Calendar,
  Target,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Challenges = () => {
  const {
    challenges,
    loading,
    error,
    addChallenge,
    joinChallenge,
    updateProgress,
  } = useChallenges();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    duration: 7,
    goal: "",
    category: "Fitness",
    difficulty: "Medium",
  });
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const handleJoin = async (challengeId) => {
    try {
      await joinChallenge(challengeId);
      setActionSuccess("Successfully joined the challenge!");
      setTimeout(() => setActionSuccess(""), 3000);
    } catch (err) {
      setActionError("Failed to join challenge");
      setTimeout(() => setActionError(""), 3000);
    }
  };

  const handleProgress = async (challengeId, amount) => {
    try {
      await updateProgress(challengeId, amount);
      setActionSuccess("Progress updated!");
      setTimeout(() => setActionSuccess(""), 3000);
    } catch (err) {
      setActionError("Failed to update progress");
      setTimeout(() => setActionError(""), 3000);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setActionError("");

    if (!newChallenge.title.trim() || !newChallenge.goal.trim()) {
      setActionError("Title and goal are required");
      return;
    }

    try {
      await addChallenge(newChallenge);
      setActionSuccess("Challenge created successfully!");
      setNewChallenge({
        title: "",
        description: "",
        duration: 7,
        goal: "",
        category: "Fitness",
        difficulty: "Medium",
      });
      setShowCreateModal(false);
      setTimeout(() => setActionSuccess(""), 3000);
    } catch (err) {
      setActionError("Failed to create challenge");
      setTimeout(() => setActionError(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className='p-6 flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-400'>
            Loading challenges...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      {/* Action Messages */}
      {actionSuccess && (
        <div className='mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center'>
          <CheckCircle className='mr-2' size={20} />
          {actionSuccess}
        </div>
      )}

      {actionError && (
        <div className='mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center'>
          <AlertCircle className='mr-2' size={20} />
          {actionError}
        </div>
      )}

      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold text-gray-800 dark:text-white'>
          Challenges & Goals
        </h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className='btn btn-primary flex items-center'
        >
          <Plus size={20} className='mr-2' />
          Create Challenge
        </button>
      </div>

      {/* Create Challenge Modal */}
      {showCreateModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                Create New Challenge
              </h3>
              <button onClick={() => setShowCreateModal(false)}>
                <X size={20} className='text-gray-500 dark:text-gray-400' />
              </button>
            </div>

            <form onSubmit={handleCreate} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Challenge Title *
                </label>
                <input
                  type='text'
                  value={newChallenge.title}
                  onChange={(e) =>
                    setNewChallenge({ ...newChallenge, title: e.target.value })
                  }
                  className='w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Description
                </label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      description: e.target.value,
                    })
                  }
                  className='w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  rows={3}
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Duration (days) *
                </label>
                <input
                  type='number'
                  value={newChallenge.duration}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      duration: parseInt(e.target.value) || 7,
                    })
                  }
                  className='w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  min='1'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Goal Description *
                </label>
                <input
                  type='text'
                  value={newChallenge.goal}
                  onChange={(e) =>
                    setNewChallenge({ ...newChallenge, goal: e.target.value })
                  }
                  className='w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  required
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                    Category
                  </label>
                  <select
                    value={newChallenge.category}
                    onChange={(e) =>
                      setNewChallenge({
                        ...newChallenge,
                        category: e.target.value,
                      })
                    }
                    className='w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  >
                    <option value='Fitness'>Fitness</option>
                    <option value='Learning'>Learning</option>
                    <option value='Productivity'>Productivity</option>
                    <option value='Mindfulness'>Mindfulness</option>
                    <option value='Social'>Social</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                    Difficulty
                  </label>
                  <select
                    value={newChallenge.difficulty}
                    onChange={(e) =>
                      setNewChallenge({
                        ...newChallenge,
                        difficulty: e.target.value,
                      })
                    }
                    className='w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  >
                    <option value='Easy'>Easy</option>
                    <option value='Medium'>Medium</option>
                    <option value='Hard'>Hard</option>
                  </select>
                </div>
              </div>

              <div className='flex justify-end space-x-2 pt-4'>
                <button
                  type='button'
                  onClick={() => setShowCreateModal(false)}
                  className='btn btn-ghost dark:text-gray-300 dark:hover:bg-gray-700'
                >
                  Cancel
                </button>
                <button type='submit' className='btn btn-primary'>
                  Create Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Challenges Grid */}
      {error ? (
        <div className='text-center p-8'>
          <AlertCircle className='mx-auto mb-4 text-red-500' size={48} />
          <p className='text-gray-600 dark:text-gray-400'>
            Error loading challenges: {error}
          </p>
        </div>
      ) : challenges.length === 0 ? (
        <div className='text-center p-8'>
          <Trophy className='mx-auto mb-4 text-yellow-500' size={48} />
          <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-2'>
            No Challenges Yet
          </h3>
          <p className='text-gray-600 dark:text-gray-400 mb-4'>
            Create your first challenge to get started!
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className='btn btn-primary'
          >
            <Plus size={20} className='mr-2' />
            Create First Challenge
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {challenges.map((challenge) => (
            <div
              key={challenge.id || challenge._id}
              className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'
            >
              <div className='flex items-center justify-between mb-4'>
                <div className='w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center'>
                  <Trophy
                    className='text-yellow-600 dark:text-yellow-400'
                    size={20}
                  />
                </div>
                {!challenge.joined ? (
                  <button
                    onClick={() => handleJoin(challenge.id || challenge._id)}
                    className='btn btn-sm btn-primary'
                  >
                    Join
                  </button>
                ) : (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      challenge.completed
                        ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                    }`}
                  >
                    {challenge.completed ? "Completed" : "Joined"}
                  </span>
                )}
              </div>

              <h3 className='font-semibold text-lg mb-2 text-gray-800 dark:text-white'>
                {challenge.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>
                {challenge.description}
              </p>

              <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4'>
                <div className='flex items-center space-x-1'>
                  <Users size={14} />
                  <span>{challenge.participants} participants</span>
                </div>
                <div className='flex items-center space-x-1'>
                  <Calendar size={14} />
                  <span>{challenge.duration} days</span>
                </div>
              </div>

              <div className='mb-2'>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    challenge.difficulty === "Easy"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                      : challenge.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                  }`}
                >
                  {challenge.difficulty}
                </span>
              </div>

              {challenge.joined && (
                <>
                  <div className='mb-4'>
                    <div className='flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1'>
                      <span>Progress</span>
                      <span>
                        {challenge.progress}/{challenge.duration}
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                      <div
                        className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                        style={{
                          width: `${
                            (challenge.progress / challenge.duration) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {!challenge.completed && (
                    <div className='flex space-x-2'>
                      <button
                        onClick={() =>
                          handleProgress(challenge.id || challenge._id, 1)
                        }
                        className='btn btn-sm btn-primary flex-1'
                      >
                        +1 Day
                      </button>
                      <button
                        onClick={() =>
                          handleProgress(challenge.id || challenge._id, -1)
                        }
                        className='btn btn-sm btn-ghost dark:text-gray-300 dark:hover:bg-gray-700'
                        disabled={challenge.progress <= 0}
                      >
                        Undo
                      </button>
                    </div>
                  )}
                </>
              )}

              {challenge.completed && (
                <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center'>
                  <Trophy
                    className='text-green-600 dark:text-green-400 mx-auto mb-2'
                    size={24}
                  />
                  <p className='text-green-800 dark:text-green-300 font-medium'>
                    Challenge Completed!
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className='mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
        <h3 className='text-lg font-semibold mb-4 text-gray-800 dark:text-white'>
          Goal Setting Guidelines
        </h3>
        <div className='text-gray-600 dark:text-gray-400'>
          <p className='mb-2'>
            Effective goal setting follows the SMART framework:
          </p>
          <ul className='list-disc list-inside space-y-1'>
            <li>
              <strong className='text-gray-800 dark:text-gray-300'>
                Specific
              </strong>{" "}
              - Clearly define what you want to achieve
            </li>
            <li>
              <strong className='text-gray-800 dark:text-gray-300'>
                Measurable
              </strong>{" "}
              - Ensure you can track progress
            </li>
            <li>
              <strong className='text-gray-800 dark:text-gray-300'>
                Achievable
              </strong>{" "}
              - Set realistic goals
            </li>
            <li>
              <strong className='text-gray-800 dark:text-gray-300'>
                Relevant
              </strong>{" "}
              - Align goals with your values
            </li>
            <li>
              <strong className='text-gray-800 dark:text-gray-300'>
                Time-bound
              </strong>{" "}
              - Set a deadline for completion
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
