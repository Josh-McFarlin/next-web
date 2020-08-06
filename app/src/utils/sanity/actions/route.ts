import { getClient } from "../client";

export const getAllRoutes = async (preview = false): Promise<string[]> =>
  getClient(preview).fetch(`*[_type == "route"].slug.current`);

export const getSitemapRoutes = async () =>
  getClient(false).fetch(`
    {
      "routes": *[_type == "route"] {
        ...,
        disallowRobot,
        includeInSitemap,
        page->{
          _id,
          title,
          _createdAt,
          _updatedAt
        }
      }
    }
  `);
