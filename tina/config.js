import { defineConfig } from "tinacms";
import { blog_postFields } from "./templates";
import { titleFields } from "./templates";
import {
  mediaHandlerConfig,
  createMediaHandler,
} from 'next-tinacms-cloudinary/dist/handlers';
import { isAuthorized } from '@tinacms/auth';

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Cloudinary media handler configuration
const mediaHandler = createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        return true;
      }

      const user = await isAuthorized(req);
      return user && user.verified;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      return mediaHandler; // Use the Cloudinary media handler
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        format: "md",
        label: "Network",
        name: "network",
        path: "source/_posts/network",
        match: {
          include: "*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...blog_postFields(),
        ],
      },
    ],
  },
});
