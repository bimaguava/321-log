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
        format: "mdx", // Changed to 'mdx' for MDX support
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
            type: "rich-text", // Changed to 'rich-text' for rich text content
            maxSearchIndexFieldLength: 200, // Index up to 200 characters for this field
            templates: [
              {
                name: "NewsletterSignup",
                label: "Newsletter Sign Up",
                fields: [
                  {
                    name: "children",
                    label: "CTA",
                    type: "rich-text",
                  },
                  {
                    name: "buttonText",
                    label: "Button Text",
                    type: "string",
                  }
                ],
              },
            ],
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
            type: "string", // Using string for categories
            name: "categories", 
            label: "Categories",
            list: true, // Make it a list of categories
            options: [
              {
                value: 'movies',
                label: 'Movies',
              },
              {
                value: 'music',
                label: 'Music',
              },
              // Add other categories as needed
            ],
          },
          {
            type: "string", // Using string for tags
            name: "tags",
            label: "Tags",
            list: true, // Make it a list of tags
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
