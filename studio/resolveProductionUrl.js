const projectUrl = process.env.SANITY_STUDIO_WEBSITE_BASE_URL;
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;

const resolveProductionUrl = (document) =>
  `${projectUrl}/api/preview?secret=${previewSecret}&type=${document._type}${
    document.slug != null ? `&slug=${document.slug.current}` : ""
  }`;

export default resolveProductionUrl;
