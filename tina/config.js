import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "master", // Define your Git branch

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Your TinaCloud Client ID
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
