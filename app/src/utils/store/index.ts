import * as React from "react";
import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import cart from "./cart/cartSlice";
import navigation from "./navigation/navigationSlice";

const combinedReducer = combineReducers({
  cart,
  navigation,
});

export type RootState = ReturnType<typeof combinedReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const initStore = (initialState: RootState) =>
  configureStore({
    reducer: combinedReducer,
    preloadedState: initialState,
  });

export let store: any;

export const initializeStore = (preloadedState: RootState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState: RootState) =>
  React.useMemo(() => initializeStore(initialState), [initialState]);
