import { Image } from "./types";

export const getUniqueThumbnails = (images: Image[]): Image[] => {
  const srcSet = new Set<string>();

  return images.filter((image: Image) => {
    const thumSrc = image?.thumbnailSrc ?? image.src;

    if (srcSet.has(thumSrc)) return false;

    srcSet.add(thumSrc);
    return true;
  });
};
