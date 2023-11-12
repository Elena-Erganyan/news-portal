import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: () => initialState,
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

// selectors
export const selectCurrentUser = (state) => state.user.user;
