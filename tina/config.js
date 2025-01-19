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
        name: "blog", // Name used internally
        path: "source/_posts", // Path to the content folder in your project
        format: "md", // Markdown support
        defaultItem: () => {
          return {
            title: "New Post",
            // The body will be populated with default content using 'root' and 'children'
            body: {
              type: "root",
              children: [
                {
                  type: "p",
                  children: [
                    {
                      type: "text",
                      text: "Default content goes here.",
                    },
                  ],
                },
              ],
            },
          };
        },
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
            name: "body", // This will store the main content
            label: "Body",
            type: "rich-text", // Use rich-text for content
            isBody: true, // Flag it as the main body content
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
            type: "string", // Categories field
            name: "categories",
            label: "Categories",
            list: true, // Make it a list of categories
            options: [
              {
                value: "movies",
                label: "Movies",
              },
              {
                value: "music",
                label: "Music",
              },
              // Add other categories as needed
            ],
          },
          {
            type: "string", // Tags field
            name: "tags",
            label: "Tags",
            list: true, // Make it a list of tags
          },
          {
            type: "string", // Keywords field
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
          {
            name: "photos",
            label: "Photos",
            type: "string", // Use string to store the URL of the photo
            required: false, // Optional field
            ui: {
              component: "textarea", // You can use a textarea for better input of URLs
            },
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
