// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import {
// Ship,
// Waves,
// Anchor,
// Compass,
// Mail,
// Lock,
// User,
// Sparkles,
// } from "lucide-react";

// const Signup = () => {
// const [displayName, setDisplayName] = useState("");
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [confirmPassword, setConfirmPassword] = useState("");
// const [error, setError] = useState("");
// const [loading, setLoading] = useState(false);

// const { signup, loginWithGoogle } = useAuth();
// const navigate = useNavigate();

// // Handle Email/Password Signup
// const handleSubmit = async (e) => {
// e.preventDefault();
// setError("");

// // Validation
// if (!displayName.trim()) {
//     return setError("Display name is required");
// }
// if (password !== confirmPassword) {
//     return setError("Passwords do not match");
// }
// if (password.length < 6) {
//     return setError("Password must be at least 6 characters");
// }

// setLoading(true);

// try {
//     await signup(email, password, displayName);
//     navigate("/dashboard");
// } catch (error) {
//     setError(error.message || "Failed to create account. Please try again.");
//     console.error("Signup error:", error);
// } finally {
//     setLoading(false);
// }
// };

// // Handle Google Signup
// const handleGoogleSignup = async () => {
// setError("");
// setLoading(true);

// try {
//     await loginWithGoogle();
//     navigate("/dashboard");
// } catch (error) {
//     setError(error.message || "Failed to sign up with Google.");
//     console.error("Google signup error:", error);
// } finally {
//     setLoading(false);
// }
// };

// return (
// <div className='min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6'>
//     {/* Decorative Waves */}
//     <div className='absolute inset-0 overflow-hidden pointer-events-none'>
//     <Waves
//         size={200}
//         className='absolute -top-20 -right-20 text-cyan-200 dark:text-cyan-900/20 rotate-12'
//     />
//     <Waves
//         size={150}
//         className='absolute -bottom-20 -left-20 text-blue-200 dark:text-blue-900/20 -rotate-45'
//     />
//     <Anchor
//         size={60}
//         className='absolute bottom-10 right-10 text-cyan-300 dark:text-cyan-800/30'
//     />
//     <Compass
//         size={60}
//         className='absolute top-10 left-10 text-blue-300 dark:text-blue-800/30'
//     />
//     </div>

//     <div className='max-w-md w-full'>
//     {/* Logo & Brand */}
//     <div className='text-center mb-8'>
//         <div className='flex items-center justify-center mb-4'>
//         <div className='relative'>
//             <div className='w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl rotate-45 transform hover:rotate-0 transition-transform duration-500 shadow-xl'></div>
//             <Ship
//             size={40}
//             className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'
//             />
//         </div>
//         </div>
//         <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400'>
//         DeepMotive
//         </h1>
//         <p className='text-gray-600 dark:text-gray-400 mt-2'>
//         Begin your voyage to better habits
//         </p>
//     </div>

//     {/* Signup Card */}
//     <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-cyan-500/20'>
//         <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'>
//         <Sparkles className='mr-2 text-cyan-500' size={24} />
//         Create Your Account
//         </h2>

//         {/* Error Message */}
//         {error && (
//         <div className='mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm'>
//             {error}
//         </div>
//         )}

//         {/* Signup Form */}
//         <form onSubmit={handleSubmit} className='space-y-4'>
//         {/* Display Name */}
//         <div>
//             <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
//             Display Name
//             </label>
//             <div className='relative'>
//             <User
//                 className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
//                 size={18}
//             />
//             <input
//                 type='text'
//                 required
//                 value={displayName}
//                 onChange={(e) => setDisplayName(e.target.value)}
//                 className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
//                 placeholder='Captain Morgan'
//                 disabled={loading}
//             />
//             </div>
//         </div>

//         {/* Email */}
//         <div>
//             <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
//             Email Address
//             </label>
//             <div className='relative'>
//             <Mail
//                 className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
//                 size={18}
//             />
//             <input
//                 type='email'
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
//                 placeholder='captain@deepmotive.com'
//                 disabled={loading}
//             />
//             </div>
//         </div>

//         {/* Password */}
//         <div>
//             <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
//             Password
//             </label>
//             <div className='relative'>
//             <Lock
//                 className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
//                 size={18}
//             />
//             <input
//                 type='password'
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
//                 placeholder='••••••••'
//                 disabled={loading}
//             />
//             </div>
//             <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
//             Must be at least 6 characters
//             </p>
//         </div>

//         {/* Confirm Password */}
//         <div>
//             <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
//             Confirm Password
//             </label>
//             <div className='relative'>
//             <Lock
//                 className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
//                 size={18}
//             />
//             <input
//                 type='password'
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
//                 placeholder='••••••••'
//                 disabled={loading}
//             />
//             </div>
//         </div>

//         {/* Submit Button */}
//         <button
//             type='submit'
//             disabled={loading}
//             className='w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
//         >
//             {loading ? (
//             <>
//                 <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
//                 Launching...
//             </>
//             ) : (
//             <>
//                 <Ship size={18} className='mr-2' />
//                 Start Your Voyage
//             </>
//             )}
//         </button>
//         </form>

//         {/* Divider */}
//         <div className='relative my-6'>
//         <div className='absolute inset-0 flex items-center'>
//             <div className='w-full border-t border-gray-300 dark:border-gray-600'></div>
//         </div>
//         <div className='relative flex justify-center text-sm'>
//             <span className='px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'>
//             Or sign up with
//             </span>
//         </div>
//         </div>

//         {/* Google Signup Button */}
//         <button
//         onClick={handleGoogleSignup}
//         disabled={loading}
//         className='w-full py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center text-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed'
//         >
//         <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
//             <path
//             fill='#4285F4'
//             d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
//             />
//             <path
//             fill='#34A853'
//             d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
//             />
//             <path
//             fill='#FBBC05'
//             d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
//             />
//             <path
//             fill='#EA4335'
//             d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
//             />
//         </svg>
//         Sign up with Google
//         </button>

//         {/* Login Link */}
//         <p className='mt-6 text-center text-gray-600 dark:text-gray-400'>
//         Already have an account?{" "}
//         <Link
//             to='/login'
//             className='text-cyan-600 dark:text-cyan-400 font-medium hover:underline'
//         >
//             Sign in
//         </Link>
//         </p>
//     </div>
//     </div>
// </div>
// );
// };

// export default Signup;