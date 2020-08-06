import React from "react";

const InternalLinkRender = ({ children }) => (
  <span>
    {children}
    <span role="img" aria-label="Link">
      {" 🔗"}
    </span>
  </span>
);

export default {
  name: "internalLink",
  type: "reference",
  title: "Internal link to another document",
  description: "Locate a document you want to link to",
  to: [{ type: "page" }, { type: "route" }],
  blockEditor: {
    icon: () => "🔗",
    render: InternalLinkRender,
  },
};
