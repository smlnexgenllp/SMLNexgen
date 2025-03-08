/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || "http://192.168.0.197:3000", // Change this to your actual domain
    generateRobotsTxt: true, // Generates robots.txt file
    sitemapSize: 5000, // Adjust sitemap size if necessary
    exclude: [
      "/admin",        // Exclude admin pages
      "/dashboard",    // Exclude dashboard
      "/profile",      // Exclude user profiles (if private)
      "/account",      // Exclude account settings
      "/settings",     // Exclude user settings
      "/auth/login",   // Exclude login page
      "/auth/register",// Exclude register page
      "/api/*"        // Exclude all API routes
    ],
    generateIndexSitemap: false, // Set to true if you have multiple sitemaps
  };
  