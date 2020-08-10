import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { NextSeo } from "next-seo";
import { Collection, Product } from "shopify-buy";
import Layout from "../../components/Layout";
import InlineProduct from "../../components/shop/InlineProduct";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { SiteConfigType } from "../../../types/sanity/documents/siteConfig";
import {
  getAllCollectionHandles,
  getCollectionByHandle,
} from "../../utils/shopify/actions/collection";
import { getBlogConfig } from "../../utils/sanity/actions/blogConfig";
import { BlogConfigType } from "../../../types/sanity/documents/blogConfig";
import { getShopConfig } from "../../utils/sanity/actions/shopConfig";
import { ShopConfigType } from "../../../types/sanity/documents/shopConfig";
import classes from "./CollectionScreen.module.scss";

interface PropTypes {
  preview: boolean;
  siteConfig: SiteConfigType;
  blogConfig: BlogConfigType;
  shopConfig: ShopConfigType;
  collection: Collection;
}

const CollectionScreen = ({
  preview,
  siteConfig,
  blogConfig,
  shopConfig,
  collection,
}: PropTypes) => {
  const router = useRouter();

  if (!router.isFallback && collection?.handle == null) {
    return <ErrorPage statusCode={404} />;
  } else if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const hasDescription =
    collection.descriptionHtml != null && collection.descriptionHtml.length > 0;

  return (
    <>
      <NextSeo
        title={shopConfig.title}
        titleTemplate={`${siteConfig.config.title} | %s`}
        description={shopConfig.description}
        // canonical={config.url && `${config.url}/${slug}`}
        openGraph={{
          images: shopConfig.openGraphImages,
        }}
      />
      <Layout
        preview={preview}
        siteConfig={siteConfig}
        shopConfig={shopConfig}
        blogConfig={blogConfig}
        inShop
      >
        <div className={classes.root}>
          <div className={classes.banner}>
            <img
              src={collection?.image?.src}
              alt={collection?.image?.altText ?? ""}
            />
            <h1>{collection.title}</h1>
          </div>
          {hasDescription && (
            <div
              className={classes.description}
              dangerouslySetInnerHTML={{
                __html: collection.descriptionHtml,
              }}
            />
          )}
          {collection.products != null && (
            <div className={classes.products}>
              {collection.products.map((product: Product) => (
                <InlineProduct key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const siteConfig = await getSiteConfig(preview);
  const blogConfig = await getBlogConfig(preview);
  const shopConfig = await getShopConfig(preview);
  const collection = await getCollectionByHandle(params?.handle as string);

  return {
    props: {
      preview,
      siteConfig,
      blogConfig,
      shopConfig,
      collection,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const shopConfig = await getShopConfig();
  const allCollections = await getAllCollectionHandles();

  let paths: any[] = [];
  if (shopConfig.enabled) {
    paths =
      allCollections?.map((collectionHandle: string) => ({
        params: {
          handle: collectionHandle,
        },
      })) || [];
  }

  return {
    paths,
    fallback: shopConfig.enabled,
  };
};

export default CollectionScreen;
