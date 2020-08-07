import { getClient } from "../client";
import { BlogConfigType } from "../../../../types/sanity/documents/blogConfig";

export const getBlogConfig = async (preview = false): Promise<BlogConfigType> =>
  getClient(preview).fetch(`
    *[_id == "global-blog-config"][0]
  `);
