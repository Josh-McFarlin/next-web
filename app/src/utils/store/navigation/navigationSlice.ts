import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigationState, SetSidebarOpenAction } from "./types";

const initialState: NavigationState = {
  sidebarOpen: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setSidebarOpen(state, action: PayloadAction<SetSidebarOpenAction>) {
      const { sidebarOpen } = action.payload;

      state.sidebarOpen = sidebarOpen;
    },
    toggleSidebarOpen(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setSidebarOpen, toggleSidebarOpen } = navigationSlice.actions;

export default navigationSlice.reducer;
