import * as React from "react";
import { ProductJsonLd, ProductJsonLdProps } from "next-seo";
import { Image, Product, ProductVariant } from "shopify-buy";
import urls from "../urls";

interface PropTypes {
  product: Product;
}

const makeConfig = (product: Product): ProductJsonLdProps => ({
  productName: product.title,
  sku: product?.id?.toString(),
  mpn: product?.id?.toString(),
  images: product.images.map((image: Image) => image.src),
  description: product.description,
  brand: product.vendor,
  offers: product.variants.map((variant: ProductVariant, index: number) => ({
    price: variant.price,
    priceCurrency: variant.priceV2.currencyCode,
    availability: variant.available
      ? "http://schema.org/InStock"
      : "http://schema.org/OutOfStock",
    url: `${urls.baseUrl}/${urls.pages.shop.products.product(
      product.handle
    )}?variant=${index}`,
    seller: {
      name: product.vendor,
    },
  })),
});

const ProductSEO = ({ product }: PropTypes) => (
  <ProductJsonLd {...makeConfig(product)} />
);

export default ProductSEO;
