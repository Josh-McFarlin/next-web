import client from "../client";

export const getAllCollections = () =>
  client.collection.fetchAll().then((collections) =>
    collections.map((collection) => ({
      title: collection.title,
      handle: collection.handle,
      image: collection.image != null ? collection.image.src : null,
    }))
  );

export const getCollectionByHandle = (collectionHandle) =>
  client.collection
    .fetchByHandle(collectionHandle)
    .then((collection) => JSON.parse(JSON.stringify(collection)));
