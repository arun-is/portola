const path = require("path")

const cwd = process.cwd()
const rootDirectory = cwd.replace(new RegExp("/inner_workings$"), "")

module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        templates: path.join(rootDirectory, "templates")
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${rootDirectory}/pages`,
        name: "markdown-pages"
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1200
            }
          }
        ]
      }
    }
  ]
}
