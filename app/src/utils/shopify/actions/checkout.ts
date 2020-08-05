import client from "../client";
import { Cart, LineItemToAdd, AttributeInput } from "shopify-buy";

export const createCheckout = (): Promise<Cart> => client.checkout.create();

export const addCartItem = (
  checkoutId: string,
  lineItemsToAdd: LineItemToAdd[]
): Promise<Cart> => client.checkout.addLineItems(checkoutId, lineItemsToAdd);

export const updateCartItem = (
  checkoutId: string,
  lineItemsToUpdate: AttributeInput[]
): Promise<Cart> =>
  client.checkout.updateLineItems(checkoutId, lineItemsToUpdate);

export const removeCartItem = (
  checkoutId: string,
  lineItemIdsToRemove: string[]
): Promise<Cart> =>
  client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove);

export const fetchCart = (checkoutId: string): Promise<Cart> =>
  client.checkout.fetch(checkoutId);
