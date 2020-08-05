export default {
  name: "socialLinks",
  title: "Social Links",
  type: "array",
  of: [
    {
      type: "socialLink",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare() {
      return {
        title: "Social Links",
      };
    },
  },
};
