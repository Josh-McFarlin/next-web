import { AppThunk, RootState, store } from "../index";
import { Dispatch } from "@reduxjs/toolkit";
import {
  createCheckout as createCheckoutPure,
  fetchCart as fetchCartPure,
  addCartItem as addCartItemPure,
  updateCartItem as updateCartItemPure,
  removeCartItem as removeCartItemPure,
} from "../../shopify/actions/checkout";
import { Cart } from "shopify-buy";
import { CartItemType } from "./types";
import { setCart } from "./cartSlice";

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

const handleSetCart = (cart: Cart, dispatch: Dispatch): void => {
  dispatch(
    setCart({
      checkoutId: cart.id.toString(),
      items: fetchItemsFromCart(cart),
      subtotal: cart.subtotalPrice,
      totalTax: cart.totalTax,
      total: cart.totalPrice,
      checkoutUrl: cart.webUrl,
    })
  );
};

export const setupCart = (): AppThunk => async (dispatch: Dispatch) => {
  const checkoutId = localStorage.getItem("checkoutId");

  if (checkoutId != null) {
    const cart = await fetchCartPure(checkoutId);

    if (cart.completedAt == null) {
      handleSetCart(cart, dispatch);
      return;
    }
  }

  const cart = await createCheckoutPure();
  handleSetCart(cart, dispatch);

  localStorage.setItem("checkoutId", cart.id.toString());
};

export const addCartItem = ({
  variantId,
  quantity,
}: {
  variantId: string | number;
  quantity: number;
}): AppThunk => async (dispatch: Dispatch) => {
  const { cart }: RootState = store.getState();

  const newCart = await addCartItemPure(cart.checkoutId as string, [
    {
      variantId,
      quantity,
    },
  ]);

  handleSetCart(newCart, dispatch);
};

export const updateCartItem = ({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}): AppThunk => async (dispatch: Dispatch) => {
  const { cart }: RootState = store.getState();

  const newCart = await updateCartItemPure(cart.checkoutId as string, [
    {
      id,
      quantity,
    },
  ]);

  handleSetCart(newCart, dispatch);
};

export const removeCartItem = ({ id }: { id: string }): AppThunk => async (
  dispatch: Dispatch
) => {
  const { cart }: RootState = store.getState();

  const newCart = await removeCartItemPure(cart.checkoutId as string, [id]);

  handleSetCart(newCart, dispatch);
};
