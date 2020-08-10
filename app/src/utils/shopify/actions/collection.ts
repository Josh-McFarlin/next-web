import client from "../client";
import { Collection } from "shopify-buy";

export const getAllCollections = (): Promise<Collection[] | null> =>
  client.collection
    .fetchAll()
    .then((collections: Collection[]) =>
      JSON.parse(JSON.stringify(collections))
    );

export const getAllCollectionHandles = (): Promise<string[]> =>
  client.collection
    .fetchAll()
    .then((collections: Collection[]) =>
      collections.map((collection: Collection) => collection.handle)
    );

export const getCollectionByHandle = (
  collectionHandle: string
): Promise<Collection | null> =>
  client.collection
    .fetchByHandle(collectionHandle)
    .then((collection: any) => JSON.parse(JSON.stringify(collection)));

export const getCollectionProducts = (
  collectionId: string
): Promise<Collection[] | null> =>
  client.collection
    .fetchWithProducts(collectionId, {
      productsFirst: 20,
    })
    .then((collection) => JSON.parse(JSON.stringify(collection)));
