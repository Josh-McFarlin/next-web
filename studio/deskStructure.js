import S from "@sanity/desk-tool/structure-builder";
import { MdDashboard, MdSettings } from "react-icons";

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = (listItem) =>
  !["page", "post", "route", "site-config", "socialLink"].includes(
    listItem.getId()
  );

export default () =>
  S.list()
    .title("Site")
    .items([
      S.listItem()
        .title("Site Config")
        .icon(MdSettings)
        .child(
          S.editor()
            .id("config")
            .schemaType("site-config")
            .documentId("global-config")
        ),
      S.listItem()
        .title("Pages")
        .icon(MdDashboard)
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),
      S.listItem()
        .title("Posts")
        .icon(MdDashboard)
        .schemaType("post")
        .child(S.documentTypeList("post").title("Posts")),
      S.listItem()
        .title("Routes")
        .schemaType("route")
        .child(S.documentTypeList("route").title("Routes")),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
