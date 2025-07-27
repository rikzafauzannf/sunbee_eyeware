import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    typedEnv: true, // supaya env bisa ter-type
  },
  images: {
    domains: ['images.unsplash.com'], // daftar domain image
  },
};

export default nextConfig;
