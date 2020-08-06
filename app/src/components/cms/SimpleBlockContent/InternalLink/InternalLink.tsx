import * as React from "react";
import Link from "next/link";
import client from "../../../../utils/sanity/client";
import { MarkDef } from "../../../../../types/sanity/objects/portableText";
import urls from "../../../../utils/urls";

interface PropTypes {
  mark: MarkDef;
  children: React.ReactChildren;
}

const InternalLink = ({ mark, children }: PropTypes) => {
  const [slug, setSlug] = React.useState<{ current: string } | null>(null);

  React.useEffect(() => {
    if (mark._ref != null) {
      const ref = mark._ref;
      const refQuery = `*[_id == "${ref}"][0]`;

      client.fetch(refQuery).then((res: any) => {
        if (res != null && res.slug != null) {
          setSlug(res.slug);
        }
      });
    }
  }, []);

  if (slug != null) {
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
  }

  return <a>{children}</a>;
};

export default InternalLink;
