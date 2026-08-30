import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults to [75]. The hero is a cinematic night frame whose
    // gradients band visibly at that level, so 85 is allowed alongside it.
    qualities: [75, 85],
  },
};

export default nextConfig;
