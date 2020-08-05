import * as React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Option, Product, Shop } from "shopify-buy";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import ImageGallery from "../../components/ImageGallery";
import VariantSelector from "../../components/shop/VariantSelector";
import QuantitySelector from "../../components/shop/QuantitySelector";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { SiteConfigType } from "../../../types/siteConfig";
import {
  getAllProductHandles,
  getProductByHandle,
} from "../../utils/shopify/actions/product";
import { getVariant } from "../../utils/shopify/actions/variant";
import { getShopInfo } from "../../utils/shopify/actions/shop";
import { addCartItem } from "../../utils/store/cart/actions";
import classes from "./ProductScreen.module.scss";

interface PropTypes {
  siteConfig: SiteConfigType;
  shopInfo: Shop;
  product: Product;
  productHandle: string;
}

const getInitialOptions = (options: Option[] = []): Record<string, string> => {
  const initialOptions: Record<string, string> = {};

  options.forEach((option: Option) => {
    initialOptions[option.name] = option.values[0].value;
  });

  return initialOptions;
};

const ProductScreen = ({ siteConfig, product }: PropTypes) => {
  const router = useRouter();
  const dispatch = useDispatch();

  if (!router.isFallback && !product?.handle) {
    return <ErrorPage statusCode={404} />;
  } else if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const [selectedOptions, setOptions] = React.useState<{
    [key: string]: string;
  }>(getInitialOptions(product.options));
  const [quantity, setQuantity] = React.useState<number>(1);
  const variant = getVariant(product, selectedOptions);

  const handleOptionChange = (key: string, value: string) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  const handleAddItem = () =>
    dispatch(
      addCartItem({
        variantId: variant.id,
        quantity,
      })
    );

  const images = [
    {
      src: variant.image.src,
      thumbnailSrc: variant.image.src,
    },
    ...product.images.map((img) => ({
      src: img.src,
      thumbnailSrc: img.src,
    })),
  ];

  return (
    <Layout siteConfig={siteConfig} className={classes.root}>
      <div className={classes.mainContent}>
        {product.images.length > 0 && (
          <ImageGallery
            className={classes.gallery}
            images={images}
            orientation="horizontal"
          />
        )}
        <div className={classes.infoContainer}>
          <div className={classes.titleContainer}>
            <h5 className={classes.title}>{product.title}</h5>
            <p className={classes.price}>${variant.price}</p>
          </div>
          {product.options.map((option) => (
            <VariantSelector
              key={option.name}
              option={option}
              value={selectedOptions[option.name]}
              setOption={handleOptionChange}
            />
          ))}
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <button className={classes.buyButton} onClick={handleAddItem}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className={classes.additionalContent}>
        {product.descriptionHtml != null ? (
          <div
            className={classes.descriptionContainer}
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        ) : (
          <p className={classes.description}>{product.description}</p>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }: any) {
  const siteConfig = await getSiteConfig();
  const shopInfo = await getShopInfo();
  const product = await getProductByHandle(params.handle);

  return {
    props: {
      siteConfig,
      shopInfo,
      product,
      productHandle: params.handle,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
}

export async function getStaticPaths() {
  const allProducts = await getAllProductHandles();

  const paths =
    allProducts?.map((productHandle: string) => ({
      params: {
        handle: productHandle,
      },
    })) || [];

  return {
    paths,
    fallback: true,
  };
}

export default ProductScreen;
