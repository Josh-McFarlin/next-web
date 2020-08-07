import { getClient } from "../client";
import { ShopConfigType } from "../../../../types/sanity/documents/shopConfig";

export const getShopConfig = async (preview = false): Promise<ShopConfigType> =>
  getClient(preview).fetch(`
    *[_id == "global-shop-config"][0]
  `);
