/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://yourdomain.com', // <-- change this to your actual deployed domain
  generateRobotsTxt: true,           // Automatically creates robots.txt
  exclude: ['/api/*'],               // Exclude API routes
};