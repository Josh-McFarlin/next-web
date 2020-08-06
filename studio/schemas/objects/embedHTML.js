import React from "react";

const HTMLpreview = ({ value }) => (
  <div dangerouslySetInnerHTML={{ __html: value.html }} />
);

export default {
  name: "embedHTML",
  type: "object",
  title: "Embed HTML",
  fields: [
    {
      name: "html",
      type: "text",
      options: {
        language: "html",
      },
      title: "HTML",
      description:
        "You usually want to avoid storing freeform HTML, but for embed codes it can be useful.",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      html: "html",
    },
    component: HTMLpreview,
  },
};
