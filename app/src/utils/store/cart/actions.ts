import { AppThunk, RootState, store } from "../index";
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  createCheckout as createCheckoutPure,
  fetchCart as fetchCartPure,
  addCartItem as addCartItemPure,
  updateCartItem as updateCartItemPure,
  removeCartItem as removeCartItemPure,
} from "../../shopify/actions/checkout";
import { Cart } from "shopify-buy";
import { CartItemType, SetCartAction } from "./types";
import { setCart, setCartLoading, setCartError } from "./cartSlice";

const fetchItemsFromCart = (cart: Cart): Record<string, CartItemType> => {
  const items: Record<string, CartItemType> = {};

  cart.lineItems.map(({ id, title, quantity, variant }: any) => {
    const {
      available,
      id: variantId,
      price,
      title: variantTitle,
      image: imageObj,
      selectedOptions: selectedOptionsArray,
      product,
    } = variant;
    const { handle: productHandle } = product;

    const selectedOptions: Record<string, string> = selectedOptionsArray.reduce(
      (
        accumulator: Record<string, string>,
        curOption: { name: string; value: string }
      ) => {
        accumulator[curOption.name] = curOption.value;

        return accumulator;
      },
      {}
    );

    items[id] = {
      id,
      title,
      productHandle,
      productImage: imageObj.src,
      variantId,
      quantity,
      price,
      available,
      variantTitle,
      selectedOptions,
    };
  });

  return items;
};

const handleSetCart = (cart: Cart): PayloadAction<SetCartAction> =>
  setCart({
    checkoutId: cart.id.toString(),
    items: fetchItemsFromCart(cart),
    subtotal: cart.subtotalPrice,
    totalTax: cart.totalTax,
    total: cart.totalPrice,
    checkoutUrl: cart.webUrl,
  });

export const setupCart = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch(setCartLoading());

  try {
    const checkoutId = localStorage.getItem("checkoutId");

    if (checkoutId != null) {
      const cart = await fetchCartPure(checkoutId);

      if (cart.completedAt == null) {
        dispatch(handleSetCart(cart));
        return;
      }
    }

    const cart = await createCheckoutPure();
    dispatch(handleSetCart(cart));

    localStorage.setItem("checkoutId", cart.id.toString());
  } catch (error) {
    dispatch(
      setCartError({
        error: "Failed to setup cart!",
      })
    );
  }
};

export const addCartItem = ({
  variantId,
  quantity,
}: {
  variantId: string | number;
  quantity: number;
}): AppThunk => async (dispatch: Dispatch) => {
  dispatch(setCartLoading());

  try {
    const { cart }: RootState = store.getState();

    const newCart = await addCartItemPure(cart.checkoutId as string, [
      {
        variantId,
        quantity,
      },
    ]);

    dispatch(handleSetCart(newCart));
  } catch (error) {
    dispatch(
      setCartError({
        error: "Failed to add item to cart!",
      })
    );
  }
};

export const updateCartItem = ({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}): AppThunk => async (dispatch: Dispatch) => {
  dispatch(setCartLoading());

  try {
    const { cart }: RootState = store.getState();

    const newCart = await updateCartItemPure(cart.checkoutId as string, [
      {
        id,
        quantity,
      },
    ]);

    dispatch(handleSetCart(newCart));
  } catch (e) {
    dispatch(
      setCartError({
        error: "Failed to update item quantity!",
      })
    );
  }
};

export const removeCartItem = ({ id }: { id: string }): AppThunk => async (
  dispatch: Dispatch
) => {
  dispatch(setCartLoading());

  try {
    const { cart }: RootState = store.getState();

    const newCart = await removeCartItemPure(cart.checkoutId as string, [id]);

    dispatch(handleSetCart(newCart));
  } catch (error) {
    dispatch(
      setCartError({
        error: "Failed to remove item from cart!",
      })
    );
  }
};
