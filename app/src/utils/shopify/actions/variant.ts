import client from "../client";
import { Product, ProductVariant } from "shopify-buy";

export const getVariant = (
  product: Product,
  selectedOptions: { [key: string]: string }
): ProductVariant => {
  try {
    return client.product.helpers.variantForOptions(
      product,
      selectedOptions as any
    );
  } catch (error) {
    return product?.variants[0];
  }
};
