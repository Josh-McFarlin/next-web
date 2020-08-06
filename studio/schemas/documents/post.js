export default {
  name: "post",
  type: "document",
  title: "Post",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      title: "Slug",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      type: "reference",
      to: { type: "author" },
      title: "Author",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      title: "Main image",
    },
    {
      name: "categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "category",
          },
        },
      ],
      title: "Categories",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      type: "date",
      options: {
        dateFormat: "MM-DD-YYYY",
        calendarTodayLabel: "Today",
      },
      title: "Published at",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      type: "portableText",
      title: "Body",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.title",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;

      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
