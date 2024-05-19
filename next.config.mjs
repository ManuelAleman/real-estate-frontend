/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "e7.pngegg.com" },
      { hostname: "i.blogs.es" },
      { hostname: "cdn.pixabay.com" },
    ],
  },
};

export default nextConfig;
