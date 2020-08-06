import { MdLink } from "react-icons";

export default {
  name: "socialLink",
  type: "object",
  title: "Social Link",
  icon: MdLink,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Name",
    },
    {
      name: "service",
      type: "string",
      options: {
        list: [
          {
            title: "LinkedIn",
            value: "linkedIn",
          },
          {
            title: "GitHub",
            value: "gitHub",
          },
          {
            title: "AngelList",
            value: "angelList",
          },
          {
            title: "Twitter",
            value: "twitter",
          },
          {
            title: "Instagram",
            value: "instagram",
          },
          {
            title: "Facebook",
            value: "facebook",
          },
        ],
      },
      title: "Service",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link",
      type: "url",
      title: "Link",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      name: "title",
      service: "service",
    },
    prepare({ name, service }) {
      return {
        title: name,
        subtitle: `${service} Social Link`,
      };
    },
  },
};
