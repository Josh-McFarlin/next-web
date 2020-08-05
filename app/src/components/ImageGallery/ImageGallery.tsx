import * as React from "react";
import clsx from "clsx";
import { Image } from "./types";
import classes from "./ImageGallery.module.scss";
import { getUniqueThumbnails } from "./utils";

interface PropTypes {
  className?: string;
  images: Image[];
  orientation?: "vertical" | "horizontal";
  height?: number;
  showTitles?: boolean;
}

const ImageGallery = ({
  className,
  images = [],
  orientation = "horizontal",
  height = 500,
  showTitles = false,
}: PropTypes) => {
  const [uniqueImages, setUniqueImages] = React.useState<Image[]>(
    getUniqueThumbnails(images)
  );
  const [curImage, setCurImage] = React.useState<number>(0);

  React.useEffect(() => {
    setUniqueImages(getUniqueThumbnails(images));
    setCurImage(0);
  }, [images.length, images[0].src]);

  const handlePrevImage = () =>
    setCurImage((prevIndex) =>
      prevIndex === 0 ? uniqueImages.length - 1 : prevIndex - 1
    );
  const handleNextImage = () =>
    setCurImage((prevIndex) =>
      prevIndex === uniqueImages.length - 1 ? 0 : prevIndex + 1
    );

  return (
    <div
      className={clsx(
        classes.root,
        orientation === "horizontal" && classes.horizontal,
        className
      )}
      style={{
        height,
      }}
    >
      <div
        className={classes.mainImage}
        style={{
          backgroundImage: `url("${uniqueImages[curImage].src}")`,
        }}
        title={
          showTitles
            ? uniqueImages[curImage]?.title ?? uniqueImages[curImage]?.alt
            : undefined
        }
      >
        {uniqueImages.length > 0 && (
          <>
            <button className={classes.imageControl} onClick={handlePrevImage}>
              {"<"}
            </button>
            <button className={classes.imageControl} onClick={handleNextImage}>
              {">"}
            </button>
            <div className={classes.progressContainer}>
              {uniqueImages.map((img, index) => (
                <div
                  key={img.src}
                  className={clsx(
                    classes.circle,
                    index === curImage && classes.selected
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {uniqueImages.length > 0 && (
        <div className={classes.thumbnailContainer}>
          {getUniqueThumbnails(uniqueImages).map((image, index) => (
            <button
              key={image.thumbnailSrc}
              className={clsx(
                classes.thumbnail,
                curImage === index && classes.selected
              )}
              title={showTitles ? image?.title ?? image?.alt : undefined}
              style={{
                backgroundImage: `url("${image.thumbnailSrc ?? image.src}")`,
              }}
              onClick={() => setCurImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
