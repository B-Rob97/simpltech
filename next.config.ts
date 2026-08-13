import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      { source: "/demos/:path*", destination: "/", permanent: false },
      { source: "/prism", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
