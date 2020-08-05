import client from "../client";
import { Collection } from "shopify-buy";

export const getAllCollections = (): Promise<Collection[]> =>
  client.collection
    .fetchAllWithProducts()
    .then((collections: Collection[]) =>
      JSON.parse(JSON.stringify(collections))
    );

export const getCollectionById = (collectionId: string): Promise<Collection> =>
  client.collection
    .fetchWithProducts(collectionId)
    .then((collection: any) => JSON.parse(JSON.stringify(collection)));
