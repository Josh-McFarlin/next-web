import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NavigationState,
  SetSidebarOpenAction,
  SetCollectionMenuOpenAction,
  SetSubmenuOpenAction,
} from "./types";

const initialState: NavigationState = {
  sidebarOpen: false,
  collectionMenuOpen: false,
  submenuState: [
    {
      submenuOpen: false,
      submenuHeader: null,
      submenuItems: [],
    },
  ],
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
    setCollectionMenuOpen(
      state,
      action: PayloadAction<SetCollectionMenuOpenAction>
    ) {
      const { collectionMenuOpen } = action.payload;

      state.collectionMenuOpen = collectionMenuOpen;
    },
    toggleCollectionMenuOpen(state) {
      state.collectionMenuOpen = !state.collectionMenuOpen;
    },
    setSubmenuOpen(state, action: PayloadAction<SetSubmenuOpenAction>) {
      const {
        submenuOpen,
        submenuHeader = null,
        submenuItems = [],
      } = action.payload;

      if (!submenuOpen && state.submenuState.length > 1) {
        state.submenuState.pop();
      } else if (submenuOpen || state.submenuState.length > 1) {
        state.submenuState.push({
          submenuOpen,
          submenuHeader,
          submenuItems,
        });
      }
    },
  },
});

export const {
  setSidebarOpen,
  toggleSidebarOpen,
  setCollectionMenuOpen,
  toggleCollectionMenuOpen,
  setSubmenuOpen,
} = navigationSlice.actions;

export default navigationSlice.reducer;
