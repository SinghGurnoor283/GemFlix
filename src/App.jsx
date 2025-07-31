import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import appStore from './utils/appStore';

import Body from './Body'; // For the auth listener
import Login from './Login';
import Browse from './Browse';

const ProtectedRoute = ({ children }) => {
  const { user, authReady } = useSelector((state) => ({
    user: state.userReducer.userInfo,
    authReady: state.userReducer.authReady,
  }));

  if (!authReady) {
    return null; 
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};


const PublicRoute = ({ children }) => {
  const { user, authReady } = useSelector((state) => ({
    user: state.userReducer.userInfo,
    authReady: state.userReducer.authReady,
  }));

  if (!authReady) {
    return null; 
  }

  
  if (user) {
    return <Navigate to="/browse" replace />;
  }

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
      <Body />
      <AppRoutes />
    </Provider>
  );
}

export default App;