import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, // enable SWC minifier
  // Optional: if your API is at a different port
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:5000/api",
  },
};

export default nextConfig;
