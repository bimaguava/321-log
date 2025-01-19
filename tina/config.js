import { defineConfig } from "tinacms";
import { blog_postFields } from "./templates"; // Import the blog_postFields function

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "main", // Define your Git branch

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
            type: "rich-text",  // Change to rich-text
            maxSearchIndexFieldLength: 200, // Index up to 200 characters for this field
          },
        ],
      },
      {
        format: "md",
        label: "Network", // Label visible in TinaCMS
        name: "network",  // Name used internally
        path: "source/_posts/network", // Path to the content folder in your project
        match: {
          include: "*", // Match all files in the folder
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...blog_postFields(), // Include additional fields from blog_postFields() imported from templates.js
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
