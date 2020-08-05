import { createSelector } from "@reduxjs/toolkit";
import { CartState } from "./types";
import { RootState } from "../index";

export const selectCartOpen = (state: RootState): CartState["isOpen"] =>
  state.cart.isOpen;

export const selectCheckoutId = (state: RootState): CartState["checkoutId"] =>
  state.cart.checkoutId;

export const selectInfo = (state: RootState) => ({
  subtotal: state.cart.subtotal,
  totalTax: state.cart.totalTax,
  total: state.cart.total,
  checkoutUrl: state.cart.checkoutUrl,
});

export const selectItemsObject = (state: RootState): CartState["items"] =>
  state.cart.items;
export const selectItems = createSelector(
  [selectItemsObject],
  (itemsObject: CartState["items"]) => Object.values(itemsObject)
);
