import * as React from "react";
import BlockContentPure from "@sanity/block-content-to-react";
import InternalLink from "./InternalLink";
import EmbedHTML from "./EmbedHTML";
import Figure from "./Figure";
import client from "../../../utils/sanity/client";
import { PortableTextType } from "../../../../types/sanity/objects/portableText";

interface PropTypes {
  blocks: PortableTextType[];
  className?: string;
  imageOptions?: {
    w?: number;
    h?: number;
    fit?: string;
  };
}

const { projectId, dataset } = client.config();

const BlockContent = ({ blocks, className, ...rest }: PropTypes) => {
  if (!blocks) {
    // console.error('Missing blocks');
    return null;
  }

  return (
    <BlockContentPure
      blocks={blocks}
      projectId={projectId}
      dataset={dataset}
      className={className}
      renderContainerOnSingleChild
      serializers={{
        marks: {
          internalLink: InternalLink,
        },
        types: {
          embedHTML: EmbedHTML,
          figure: Figure,
        },
      }}
      {...rest}
    />
  );
};

export default BlockContent;
