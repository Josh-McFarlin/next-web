import client from "../client";
import { Shop } from "shopify-buy";

export const getShopInfo = (): Promise<Shop> =>
  client.shop
    .fetchInfo()
    .then((shop: Shop) => JSON.parse(JSON.stringify(shop)));
