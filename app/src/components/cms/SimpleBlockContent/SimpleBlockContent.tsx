import * as React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import BlockContent from "@sanity/block-content-to-react";
import InternalLink from "./InternalLink";
import client from "../../../utils/sanity/client";

interface PropTypes {
  blocks: any[];
  className?: string;
  imageOptions?: {
    w?: number;
    h?: number;
    fit?: string;
  };
}

const { projectId, dataset } = client.config();

const SimpleBlockContent = ({ blocks, className, ...rest }: PropTypes) => {
  if (!blocks) {
    // console.error('Missing blocks');
    return null;
  }

  return (
    <BlockContent
      blocks={blocks}
      projectId={projectId}
      dataset={dataset}
      className={className}
      renderContainerOnSingleChild
      serializers={{
        marks: {
          internalLink: InternalLink,
        },
      }}
      {...rest}
    />
  );
};

export default SimpleBlockContent;
