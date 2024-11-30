import { createClient } from "@sanity/client";

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // Sanity project ID
  dataset: import.meta.env.VITE_SANITY_DATASET, // Sanity dataset
  apiVersion: "2023-01-01", // Sanity API version
  useCdn: true, // `false` if you want to ensure fresh data
  token: import.meta.env.VITE_SANITY_API_TOKEN,
});

export default client;
