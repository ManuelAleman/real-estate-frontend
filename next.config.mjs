/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "e7.pngegg.com" },
      { hostname: "i.blogs.es" },
      { hostname: "cdn.pixabay.com" },
      { hostname: "w7.pngwing.com" },
      { hostname: "i.pinimg.com" },
      { hostname: "via.placeholder.com" },
    ],
  },
};

export default nextConfig;
