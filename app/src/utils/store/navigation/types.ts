import { RouteType } from "../../../../types/sanity/documents/route";
import { LinkType } from "../../../../types/sanity/objects/link";
import { ShopCollectionType } from "../../../../types/sanity/objects/shopCollection";

export interface SubmenuState {
  submenuOpen: boolean;
  submenuHeader: string | null;
  submenuItems: (RouteType | LinkType | ShopCollectionType)[];
}

export interface NavigationState {
  sidebarOpen: boolean;
  collectionMenuOpen: boolean;
  submenuState: SubmenuState[];
}

export interface SetSidebarOpenAction {
  sidebarOpen: NavigationState["sidebarOpen"];
}

export interface SetCollectionMenuOpenAction {
  collectionMenuOpen: NavigationState["collectionMenuOpen"];
}

export interface SetSubmenuOpenAction {
  submenuOpen: SubmenuState["submenuOpen"];
  submenuHeader?: SubmenuState["submenuHeader"];
  submenuItems?: SubmenuState["submenuItems"];
}
