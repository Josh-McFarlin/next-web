import { NavigationState } from "./types";
import { RootState } from "../index";

export const selectSidebarOpen = (
  state: RootState
): NavigationState["sidebarOpen"] => state.navigation.sidebarOpen;
