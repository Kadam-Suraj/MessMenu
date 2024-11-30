import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// dotenv.config();

const client = createClient({
  projectId: 'n2wxwdlq', // Sanity project ID
  dataset: 'production', // Sanity dataset
  apiVersion: "2023-01-01", // Sanity API version
  useCdn: true, // `false` if you want to ensure fresh data
  token: 'skRPWXPK6H6mcODzlE3u0vm9ketpH9wc1eMPL6HAn0PnIHruzYjpLoExaIJ4KF9a6zOHFAEJRioNFACz0odCkSWDNkhZrxlSVinTKaALHa6HJRbGgf8461jMpbLRv8msHyRy9Hs3Tw33M5j8gkxFF2VNueUCCzRwT003c2ArMYmSVEmkytPX',
});

export default client;
