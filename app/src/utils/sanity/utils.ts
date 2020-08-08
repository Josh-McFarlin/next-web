export const convertSlug = (
  slug?: string | string[] | undefined
): string | undefined => {
  if (slug == null) return undefined;

  return typeof slug === "string" ? slug : slug.join("/");
};
