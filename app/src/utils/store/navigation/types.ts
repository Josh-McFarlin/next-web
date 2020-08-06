export interface NavigationState {
  sidebarOpen: boolean;
}

export interface SetSidebarOpenAction {
  sidebarOpen: NavigationState["sidebarOpen"];
}
