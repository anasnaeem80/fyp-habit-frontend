// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { currentUser, loading } = useAuth();

//   // Show loading spinner while checking authentication
//   if (loading) {
//     return (
//       <div className='flex items-center justify-center min-h-screen'>
//         <div className='text-center'>
//           <div className='w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
//           <p className='text-gray-600 dark:text-gray-400'>
//             Verifying authentication...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Redirect to login if not authenticated
//   if (!currentUser) {
//     return <Navigate to="/login" replace />;
//   }

//   // Render children if authenticated
//   return children;
// };

// export default ProtectedRoute;