import * as React from "react";

interface PropTypes {
  node: {
    html: string;
  };
}

const EmbedHTML = ({ node }: PropTypes) => (
  <div dangerouslySetInnerHTML={{ __html: node.html }} />
);

export default EmbedHTML;
