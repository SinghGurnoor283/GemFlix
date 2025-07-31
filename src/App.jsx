import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import appStore from './utils/appStore';

import Body from './Body'; // For the auth listener
import Login from './Login';
import Browse from './Browse';

// --- Route Guard Components ---

/**
 * Prevents logged-out users from accessing protected pages.
 * Redirects them to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const { user, authReady } = useSelector((state) => ({
    user: state.userReducer.userInfo,
    authReady: state.userReducer.authReady,
  }));

  // Wait until the initial auth check is complete
  if (!authReady) {
    return null; // Or render a loading spinner
  }

  // If the check is done and there's no user, redirect
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If the check is done and there is a user, render the page
  return children;
};

/**
 * Prevents logged-in users from accessing public pages like Login/Sign Up.
 * Redirects them to the main browse page.
 */
const PublicRoute = ({ children }) => {
  const { user, authReady } = useSelector((state) => ({
    user: state.userReducer.userInfo,
    authReady: state.userReducer.authReady,
  }));

  // Wait for the initial auth check
  if (!authReady) {
    return null; // Or render a loading spinner
  }

  // If the user is logged in, redirect them away from the public page
  if (user) {
    return <Navigate to="/browse" replace />;
  }

  // If the user is not logged in, show the public page
  return children;
};


// --- Router Configuration ---

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/browse',
    element: (
      <ProtectedRoute>
        <Browse />
      </ProtectedRoute>
    ),
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}


// --- Main App Component ---

function App() {
  return (
    <Provider store={appStore}>
      {/* This component handles the Firebase auth state listener */}
      <Body />
      {/* This component renders the appropriate page based on the route */}
      <AppRoutes />
    </Provider>
  );
}

export default App;