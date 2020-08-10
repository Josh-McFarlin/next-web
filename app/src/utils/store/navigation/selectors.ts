import { NavigationState, SubmenuState } from "./types";
import { RootState } from "../index";

export const selectSidebarOpen = (
  state: RootState
): NavigationState["sidebarOpen"] => state.navigation.sidebarOpen;

export const selectCollectionMenuOpen = (
  state: RootState
): NavigationState["collectionMenuOpen"] => state.navigation.collectionMenuOpen;

export const selectSubmenu = (state: RootState): SubmenuState =>
  state.navigation.submenuState[state.navigation.submenuState.length - 1];

export const selectSubmenuLength = (state: RootState): number =>
  state.navigation.submenuState.length;
