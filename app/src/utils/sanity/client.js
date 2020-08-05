import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
const prod = process.env.NODE_ENV === "production";

const options = {
  dataset: "production",
  projectId: process.env.SANITY_PROJECT_ID ?? "tt34oyma",
  useCdn: prod,
};

export const client = sanityClient(options);

export const imageBuilder = imageUrlBuilder(client);

export const previewClient = sanityClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const getClient = (preview) => (preview ? previewClient : client);

export default client;
