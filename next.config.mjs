/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sml-backend-qgp6.onrender.com", // Allow images from your backend
      },
    ],
  },
};

export default nextConfig; // Use export default instead of module.exports
