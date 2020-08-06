export default {
  name: "socialLinks",
  type: "array",
  of: [{ type: "socialLink" }],
  title: "Social Links",
  preview: {
    prepare() {
      return {
        title: "Social Links",
      };
    },
  },
};
