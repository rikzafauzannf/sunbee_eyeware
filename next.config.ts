import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    typedEnv: true, // supaya env bisa ter-type
  },
};

export default nextConfig;
