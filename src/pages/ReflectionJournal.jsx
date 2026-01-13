import React, { useState } from "react";
import { useJournal } from "../hooks/useJournal";
import {
  Plus,
  Edit3,
  Trash2,
  Smile,
  Frown,
  Meh,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ReflectionJournal = () => {
  const { entries, loading, error, addEntry, updateEntry, deleteEntry } =
    useJournal();
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    id: null,
    content: "",
    mood: "neutral",
  });
  const [showForm, setShowForm] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const moods = [
    { value: "happy", label: "Happy", icon: Smile, color: "text-green-500" },
    { value: "neutral", label: "Neutral", icon: Meh, color: "text-yellow-500" },
    { value: "sad", label: "Sad", icon: Frown, color: "text-red-500" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionError("");
    setActionSuccess("");

    if (currentEntry.content.trim() === "") {
      setActionError("Journal content is required");
      return;
    }

    try {
      if (isEditing) {
        await updateEntry(currentEntry.id, currentEntry);
        setActionSuccess("Journal entry updated successfully!");
      } else {
        await addEntry(currentEntry);
        setActionSuccess("Journal entry created successfully!");
      }

      setCurrentEntry({ id: null, content: "", mood: "neutral" });
      setShowForm(false);
      setIsEditing(false);

      setTimeout(() => setActionSuccess(""), 3000);
    } catch (err) {
      setActionError(
        isEditing ? "Failed to update entry" : "Failed to create entry"
      );
      setTimeout(() => setActionError(""), 3000);
    }
  };

  const handleEdit = (entry) => {
    setCurrentEntry({
      id: entry.id || entry._id,
      content: entry.content,
      mood: entry.mood,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      try {
        await deleteEntry(id);
        setActionSuccess("Journal entry deleted successfully!");
        setTimeout(() => setActionSuccess(""), 3000);
      } catch (err) {
        setActionError("Failed to delete journal entry");
        setTimeout(() => setActionError(""), 3000);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className='p-6 flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-400'>
            Loading journal entries...
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
          Reflection Journal
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className='btn btn-primary flex items-center'
        >
          <Plus size={20} className='mr-2' />
          New Entry
        </button>
      </div>

      {showForm && (
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800 dark:text-white'>
            {isEditing ? "Edit Entry" : "New Journal Entry"}
          </h3>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300'>
                How are you feeling?
              </label>
              <div className='flex space-x-4'>
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  return (
                    <button
                      key={mood.value}
                      type='button'
                      onClick={() =>
                        setCurrentEntry({ ...currentEntry, mood: mood.value })
                      }
                      className={`flex flex-col items-center p-3 rounded-lg border-2 ${
                        currentEntry.mood === mood.value
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <Icon size={24} className={mood.color} />
                      <span className='text-sm mt-1 text-gray-700 dark:text-gray-300'>
                        {mood.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300'>
                Reflection *
              </label>
              <textarea
                value={currentEntry.content}
                onChange={(e) =>
                  setCurrentEntry({ ...currentEntry, content: e.target.value })
                }
                className='w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                placeholder="Write about your day, your progress, challenges, or anything else you'd like to reflect on..."
                rows={6}
                required
              />
            </div>

            <div className='flex justify-end space-x-3'>
              <button
                type='button'
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                  setCurrentEntry({ id: null, content: "", mood: "neutral" });
                }}
                className='btn btn-ghost dark:text-gray-300 dark:hover:bg-gray-700'
              >
                Cancel
              </button>
              <button type='submit' className='btn btn-primary'>
                {isEditing ? "Update Entry" : "Save Entry"}
              </button>
            </div>
          </form>
        </div>
      )}

      {error ? (
        <div className='text-center p-8'>
          <AlertCircle className='mx-auto mb-4 text-red-500' size={48} />
          <p className='text-gray-600 dark:text-gray-400'>
            Error loading journal: {error}
          </p>
        </div>
      ) : entries.length === 0 ? (
        <div className='text-center py-12'>
          <div className='w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Edit3 size={32} className='text-gray-400' />
          </div>
          <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
            No entries yet
          </h3>
          <p className='text-gray-500 dark:text-gray-400 mb-4'>
            Start writing to reflect on your habit journey
          </p>
          <button onClick={() => setShowForm(true)} className='btn btn-primary'>
            <Plus size={20} className='mr-2' />
            Write First Entry
          </button>
        </div>
      ) : (
        <div className='space-y-4'>
          {entries.map((entry) => {
            const moodConfig = moods.find((m) => m.value === entry.mood);
            const MoodIcon = moodConfig?.icon || Meh;

            return (
              <div
                key={entry.id || entry._id}
                className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'
              >
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`p-2 rounded-full ${moodConfig?.color.replace(
                        "text",
                        "bg"
                      )} bg-opacity-20`}
                    >
                      <MoodIcon size={20} className={moodConfig?.color} />
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-800 dark:text-white'>
                        {moodConfig?.label} Day
                      </h3>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {formatDate(entry.createdAt || entry.date)}
                      </p>
                    </div>
                  </div>

                  <div className='flex space-x-2'>
                    <button
                      onClick={() => handleEdit(entry)}
                      className='p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded'
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id || entry._id)}
                      className='p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded'
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className='text-gray-700 dark:text-gray-300 whitespace-pre-wrap'>
                  {entry.content}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReflectionJournal;
