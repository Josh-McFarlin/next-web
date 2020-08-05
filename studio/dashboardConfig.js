export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId: "5d61c74bf6428ff2e17c7087",
                  title: "Sanity Studio",
                  name: "my-portfolio-studio-jjfx6v8h",
                  apiId: "bcc85298-bf84-4ca0-9fe7-0182b543f36e",
                },
                {
                  buildHookId: "5d61c74b408efd13bcb4f168",
                  title: "Landing pages Website",
                  name: "my-portfolio-web-ahq6sri6",
                  apiId: "c0d70a92-2491-42e4-8edd-6619a4ad26af",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value: "https://github.com/Josh-McFarlin/my-portfolio",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://my-portfolio-web-ahq6sri6.netlify.com",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recently edited",
        order: "_updatedAt desc",
        limit: 10,
        types: ["page"],
      },
      layout: { width: "medium" },
    },
  ],
};
