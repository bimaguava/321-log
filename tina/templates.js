export function blog_postFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "title",
    },
    {
      type: "datetime",
      name: "date",
      label: "date",
    },
    {
      type: "datetime",
      name: "updated",
      label: "updated",
    },
    {
      type: "boolean",
      name: "draft",
      label: "draft",
    },
    {
      type: "string",
      name: "category",
      label: "category",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "string",
      name: "tags",
      label: "tags",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "string",
      name: "keywords",
      label: "keywords",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "boolean",
      name: "comments",
      label: "comments",
    },
    {
      type: "boolean",
      name: "toc",
      label: "Table of Contents",
    },
  ];
}
export function titleFields() {
  return [];
}
