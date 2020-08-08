const prod = process.env.NODE_ENV === "production";

const fixSlug = (slug?: string): string | undefined => slug?.replace(/^\//, "");

const localWithPort = process.env.PORT
  ? `http://localhost:${process.env.PORT}`
  : "http://localhost:3000";

const urls = {
  baseUrl: prod ? process.env.BASE_URL ?? localWithPort : localWithPort,
  pages: {
    index: () => `/`,
    sanityPage: (slug?: string) => `/${fixSlug(slug) ?? "[...slug]"}`,
    blog: {
      index: () => `/blog`,
      post: (slug?: string) => `/blog/${fixSlug(slug) ?? "[...slug]"}`,
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
