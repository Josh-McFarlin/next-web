import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CartState,
  SetCartAction,
  SetCartErrorAction,
  SetCartOpenAction,
} from "./types";

const initialState: CartState = {
  isOpen: false,
  checkoutId: null,
  items: {},
  subtotal: null,
  totalTax: null,
  total: null,
  checkoutUrl: null,
  actionLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<SetCartAction>) {
      const {
        checkoutId,
        items,
        subtotal,
        totalTax,
        total,
        checkoutUrl,
      } = action.payload;

      state.checkoutId = checkoutId;
      state.items = items;
      state.subtotal = subtotal;
      state.totalTax = totalTax;
      state.total = total;
      state.checkoutUrl = checkoutUrl;

      state.actionLoading = false;
      state.error = null;
    },
    setCartLoading(state) {
      state.actionLoading = true;
      state.error = null;
    },
    setCartError(state, action: PayloadAction<SetCartErrorAction>) {
      const { error } = action.payload;

      state.actionLoading = false;
      state.error = error;
    },
    setCartOpen(state, action: PayloadAction<SetCartOpenAction>) {
      const { isOpen } = action.payload;

      state.isOpen = isOpen;
    },
  },
});

export const {
  setCart,
  setCartLoading,
  setCartError,
  setCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
