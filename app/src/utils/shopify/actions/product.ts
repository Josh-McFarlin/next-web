import client from "../client";
import { Product } from "shopify-buy";

export const getAllProducts = (): Promise<Product[]> =>
  client.product
    .fetchAll()
    .then((products: Product[]) => JSON.parse(JSON.stringify(products)));

export const getAllProductHandles = (): Promise<string[]> =>
  client.product.fetchAll().then((products: Product[]) =>
    products.reduce((handles: string[], product: Product) => {
      if (product.availableForSale) {
        handles.push(product.handle);
      }

      return handles;
    }, [])
  );

export const getProductByHandle = (productHandle: string): Promise<Product> =>
  client.product
    .fetchByHandle(productHandle)
    .then((product: Product) => JSON.parse(JSON.stringify(product)));
