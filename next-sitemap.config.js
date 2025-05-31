/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://dionyichia.com',
  generateRobotsTxt: true,           // Automatically creates robots.txt
  exclude: ['/api/*'],               // Exclude API routes
};