import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "master", // Define your Git branch

  clientId: process.env.PUBLIC_TINA_CLIENT_ID, // Your TinaCloud Client ID
  token: process.env.TINA_TOKEN, // Your TinaCloud Token

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "source",
    },
  },

  schema: {
    collections: [
      {
        label: "Blog Posts", // Label visible in TinaCMS
        name: "blog",       // Name used internally
        path: "source/_posts", // Path to the content folder in your project
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            searchable: true, // Include this field in the search index
          },
          {
            name: "author",
            label: "Author",
            type: "string",
            searchable: false, // Exclude this field from the search index
          },
          {
            name: "content",
            label: "Content",
            type: "rich-text", // Changed to 'rich-text' as 'text' is not supported
            maxSearchIndexFieldLength: 200, // Index up to 200 characters for this field
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "datetime",
            name: "updated",
            label: "Updated",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: "object", // Keep as 'object' for handling array-like fields
            name: "categories", 
            label: "Categories",
            fields: [
              {
                name: "category",
                label: "Category",
                type: "string", // Now it's a string for each category
                list: true, // Make it a list of categories
              },
            ],
          },
          {
            type: "object", // Keep as 'object' for handling array-like fields
            name: "tags",
            label: "Tags",
            fields: [
              {
                name: "tag",
                label: "Tag",
                type: "string", // Now it's a string for each tag
                list: true, // Make it a list of tags
              },
            ],
          },
          {
            type: "string",
            name: "keywords",
            label: "Keywords",
            list: true, // This will let you enter a list of keywords
          },
          {
            type: "boolean",
            name: "comments",
            label: "Comments",
          },
          {
            type: "boolean",
            name: "toc",
            label: "Table of Contents",
          },
          {
            name: "excerpt",
            label: "Excerpt",
            type: "string",
            required: false,
          },
        ],
      },
    ],
  },

  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN, // Add your TinaCloud Search Token
      stopwordLanguages: ["eng"], // Optional, defaults to English stop words
    },
    indexBatchSize: 100, // Optional, number of documents indexed per request (default 100)
    maxSearchIndexFieldLength: 100, // Optional, text field length indexed (default 100 characters)
  },
});
