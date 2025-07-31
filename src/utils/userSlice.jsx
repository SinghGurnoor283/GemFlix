// file: ./utils/userSlice.js (Example)

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,   // To store user data
  authReady: false, // To track if initial auth check is done
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
      state.authReady = true; // Set auth ready when user is added
    },
    removeUser: (state) => {
      state.userInfo = null;
      state.authReady = true; // Also set auth ready when user is removed
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;