const path = require("path")

module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        templates: path.join(process.cwd(), "templates")
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${process.cwd()}/pages`,
        name: "markdown-pages"
      }
    },
    `gatsby-transformer-remark`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
}
