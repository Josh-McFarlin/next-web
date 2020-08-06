import React from "react";

const LinkRender = ({ children }) => (
  <span>
    {children}
    <span role="img" aria-label="Link">
      {" 🌍"}
    </span>
  </span>
);

export default {
  name: "link",
  type: "object",
  title: "URL",
  fields: [
    {
      name: "href",
      type: "url",
      title: "URL",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          scheme: ["https", "http", "mailto", "tel"],
        }),
    },
  ],
  blockEditor: {
    icon: () => "🌍",
    render: LinkRender,
  },
};
