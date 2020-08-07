import dayjs from "dayjs";

const prod = process.env.NODE_ENV === "production";

const fixSlug = (slug?: string): string | undefined => slug?.replace(/^\//, "");

const formatDate = (date: string): string => dayjs(date).format("MM-DD-YYYY");
const makePostSlug = (slug?: string, publishedAt?: string) =>
  slug != null && publishedAt != null
    ? `${formatDate(publishedAt)}/${fixSlug(slug)}`
    : undefined;

const localWithPort = process.env.PORT
  ? `http://localhost:${process.env.PORT}`
  : "http://localhost:3000";

const urls = {
  baseUrl: prod ? process.env.BASE_URL ?? localWithPort : localWithPort,
  pages: {
    sanityPage: (slug?: string) => `/${fixSlug(slug) ?? "[[...slug]]"}`,
    blog: {
      index: () => `/blog`,
      post: (slug?: string, publishedAt?: string) =>
        `/blog/${makePostSlug(slug, publishedAt) ?? "[...slug]"}`,
    },
    shop: {
      index: () => `/shop`,
      cart: () => `/shop/cart`,
      products: {
        all: () => `/shop/products`,
        product: (handle?: string) =>
          `/shop/products/${fixSlug(handle) ?? "[handle]"}`,
      },
    },
  },
  api: {},
};

export default urls;
