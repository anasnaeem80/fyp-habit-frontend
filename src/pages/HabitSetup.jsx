import React, { useState } from "react";
import { useHabits } from "../hooks/useHabits";
import { Plus, X, CheckCircle, AlertCircle } from "lucide-react";

const HabitSetup = () => {
  const { addHabit, loading, error: habitsError } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: "daily",
    goal: 7,
    category: "Wellness",
    color: "bg-blue-500",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = [
    "Wellness",
    "Fitness",
    "Learning",
    "Productivity",
    "Social",
    "Other",
  ];

  const colors = [
    { name: "Blue", value: "bg-blue-500" },
    { name: "Green", value: "bg-green-500" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Red", value: "bg-red-500" },
    { name: "Yellow", value: "bg-yellow-500" },
    { name: "Indigo", value: "bg-indigo-500" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Habit name is required");
      return;
    }

    try {
      await addHabit(formData);
      setSuccess(`Habit "${formData.name}" created successfully!`);

      // Reset form
      setFormData({
        name: "",
        description: "",
        frequency: "daily",
        goal: 7,
        category: "Wellness",
        color: "bg-blue-500",
      });

      setIsModalOpen(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError("Failed to create habit. Please try again.");
      console.error("Error creating habit:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='p-6'>
      {/* Success/Error Messages */}
      {success && (
        <div className='mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center'>
          <CheckCircle className='mr-2' size={20} />
          {success}
        </div>
      )}

      {error && (
        <div className='mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center'>
          <AlertCircle className='mr-2' size={20} />
          {error}
        </div>
      )}

      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold text-gray-800 dark:text-white'>
          Habit Setup
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className='btn btn-primary flex items-center'
          disabled={loading}
        >
          <Plus size={20} className='mr-2' />
          Add New Habit
        </button>
      </div>

      {/* Create Habit Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                Create New Habit
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={loading}
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Habit Name *
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  required
                  disabled={loading}
                  placeholder='e.g., Morning Meditation'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Description
                </label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  rows={3}
                  disabled={loading}
                  placeholder='Describe your habit (optional)'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Frequency
                </label>
                <select
                  name='frequency'
                  value={formData.frequency}
                  onChange={handleChange}
                  className='w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  disabled={loading}
                >
                  <option value='daily'>Daily</option>
                  <option value='weekly'>Weekly</option>
                  <option value='monthly'>Monthly</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Goal (times per week)
                </label>
                <input
                  type='number'
                  name='goal'
                  value={formData.goal}
                  onChange={handleChange}
                  min='1'
                  max='7'
                  className='w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  disabled={loading}
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Category
                </label>
                <select
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  className='w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                  disabled={loading}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Color Theme
                </label>
                <div className='flex flex-wrap gap-2'>
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type='button'
                      onClick={() =>
                        setFormData({ ...formData, color: color.value })
                      }
                      className={`w-8 h-8 rounded-full ${
                        color.value
                      } flex items-center justify-center ${
                        formData.color === color.value
                          ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800"
                          : ""
                      }`}
                      disabled={loading}
                      title={color.name}
                    >
                      {formData.color === color.value && (
                        <CheckCircle size={16} className='text-white' />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className='flex justify-end space-x-2 pt-4'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='btn btn-ghost dark:text-gray-300 dark:hover:bg-gray-700'
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                      Creating...
                    </>
                  ) : (
                    "Create Habit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
        <h3 className='text-lg font-semibold mb-4 text-gray-800 dark:text-white'>
          Habit Creation Guide
        </h3>
        <div className='text-gray-600 dark:text-gray-400'>
          <p className='mb-2'>Creating effective habits involves:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Starting with small, achievable actions</li>
            <li>Being specific about what you'll do and when</li>
            <li>Linking new habits to existing routines</li>
            <li>Tracking your progress consistently</li>
            <li>Celebrating small wins along the way</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HabitSetup;
