// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';

// import Login from './Login';
// import Browse from './Browse';

// const ProtectedRoute = ({ children }) => {
//   const user = useSelector((state) => state.userReducer);
//   if (!user) return <Navigate to="/" replace />;
//   return children;
// };

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Login />,
//   },
//   {
//     path: '/browse',
//     element: (
//       <ProtectedRoute>
//         <Browse />
//       </ProtectedRoute>
//     ),
//   },
// ]);

// function AppRoutes() {
//   return <RouterProvider router={router} />;
// }

// export default AppRoutes;
