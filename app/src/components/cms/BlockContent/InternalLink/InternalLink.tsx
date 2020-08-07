import * as React from "react";
import Link from "next/link";
import { MarkDef } from "../../../../../types/sanity/objects/portableText";
import urls from "../../../../utils/urls";

interface PropTypes {
  mark: MarkDef;
  children: React.ReactChildren;
}

const InternalLink = ({ mark, children }: PropTypes) => {
  const { slug } = mark;

  if (slug == null) return <a>{children}</a>;

  return (
    <Link
      href={{
        pathname: urls.pages.sanityPage(),
        query: { slug: slug.current },
      }}
      as={urls.pages.sanityPage(slug.current)}
    >
      <a>{children}</a>
    </Link>
  );
};

export default InternalLink;
