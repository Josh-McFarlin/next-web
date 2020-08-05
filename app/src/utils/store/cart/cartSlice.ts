import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, SetCartAction, SetCartOpenAction } from "./types";

const initialState: CartState = {
  isOpen: false,
  checkoutId: null,
  items: {},
  subtotal: null,
  totalTax: null,
  total: null,
  checkoutUrl: null,
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
    },
    setCartOpen(state, action: PayloadAction<SetCartOpenAction>) {
      const { isOpen } = action.payload;

      state.isOpen = isOpen;
    },
    toggleCartOpen(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setCart, setCartOpen, toggleCartOpen } = cartSlice.actions;

export default cartSlice.reducer;
