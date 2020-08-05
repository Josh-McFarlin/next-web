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
      title: "Service",
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
    },
    {
      name: "link",
      type: "url",
      title: "Link",
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
