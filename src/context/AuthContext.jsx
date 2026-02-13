// import React, { createContext, useState, useContext, useEffect } from "react";
// import api from "../api/axios";

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Check for saved user and token in localStorage
//   useEffect(() => {
//     const verifyUser = async () => {
//       const token = localStorage.getItem("deepmotive_token");
//       const savedUser = localStorage.getItem("deepmotive_user");

//       if (token && savedUser) {
//         try {
//           // Set default Authorization header for all requests
//           api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
//           // Verify token with backend
//           const response = await api.get("/auth/me");
          
//           if (response.data.success) {
//             setCurrentUser(response.data.user);
//           } else {
//             // Invalid token, clear storage
//             localStorage.removeItem("deepmotive_token");
//             localStorage.removeItem("deepmotive_user");
//             delete api.defaults.headers.common['Authorization'];
//           }
//         } catch (error) {
//           console.error("Token verification failed:", error);
//           localStorage.removeItem("deepmotive_token");
//           localStorage.removeItem("deepmotive_user");
//           delete api.defaults.headers.common['Authorization'];
//         }
//       }
//       setLoading(false);
//     };

//     verifyUser();
//   }, []);

//   // Signup function
//   const signup = async (email, password, displayName) => {
//     try {
//       setError("");
//       const response = await api.post("/auth/signup", {
//         displayName,
//         email,
//         password,
//       });

//       if (response.data.success) {
//         const { token, user } = response.data;
        
//         // Save to localStorage
//         localStorage.setItem("deepmotive_token", token);
//         localStorage.setItem("deepmotive_user", JSON.stringify(user));
        
//         // Set default Authorization header
//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
//         setCurrentUser(user);
//         return user;
//       }
//     } catch (error) {
//       const message = error.response?.data?.error || "Failed to create account";
//       setError(message);
//       throw new Error(message);
//     }
//   };

//   // Login function
//   const login = async (email, password) => {
//     try {
//       setError("");
//       const response = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       if (response.data.success) {
//         const { token, user } = response.data;
        
//         // Save to localStorage
//         localStorage.setItem("deepmotive_token", token);
//         localStorage.setItem("deepmotive_user", JSON.stringify(user));
        
//         // Set default Authorization header
//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
//         setCurrentUser(user);
//         return user;
//       }
//     } catch (error) {
//       const message = error.response?.data?.error || "Invalid email or password";
//       setError(message);
//       throw new Error(message);
//     }
//   };

//   // Google login/signup
//   const loginWithGoogle = async () => {
//     try {
//       setError("");
      
//       // In production, use proper Google OAuth
//       // For now, simulate with mock data
//       const mockGoogleUser = {
//         email: prompt("Enter your Google email:", "user@gmail.com") || "user@gmail.com",
//         displayName: prompt("Enter your name:", "Google User") || "Google User",
//         photoURL: "https://via.placeholder.com/150",
//         googleId: Date.now().toString(),
//       };

//       const response = await api.post("/auth/google", mockGoogleUser);

//       if (response.data.success) {
//         const { token, user } = response.data;
        
//         localStorage.setItem("deepmotive_token", token);
//         localStorage.setItem("deepmotive_user", JSON.stringify(user));
        
//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
//         setCurrentUser(user);
//         return user;
//       }
//     } catch (error) {
//       const message = error.response?.data?.error || "Failed to login with Google";
//       setError(message);
//       throw new Error(message);
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       setError("");
//       localStorage.removeItem("deepmotive_token");
//       localStorage.removeItem("deepmotive_user");
//       delete api.defaults.headers.common['Authorization'];
//       setCurrentUser(null);
//     } catch (error) {
//       const message = error.message || "Failed to logout";
//       setError(message);
//       throw new Error(message);
//     }
//   };

//   // Reset password
//   const resetPassword = async (email) => {
//     try {
//       setError("");
//       const response = await api.post("/auth/reset-password", { email });
      
//       if (response.data.success) {
//         return response.data;
//       }
//     } catch (error) {
//       const message = error.response?.data?.error || "Failed to reset password";
//       setError(message);
//       throw new Error(message);
//     }
//   };

//   const value = {
//     currentUser,
//     loading,
//     error,
//     signup,
//     login,
//     loginWithGoogle,
//     logout,
//     resetPassword,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };