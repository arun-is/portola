const path = require("path")
const util = require("util")

const frontmatterQuery = addTwo => `
{
  __type(name: "frontmatter${addTwo ? "_2" : ""}") {
    name
    fields {
      name
    }
  }
}
`

exports.createPages = async ({ actions, graphql }) => {
  let fieldsResult = await graphql(frontmatterQuery())

  if (!fieldsResult.data.__type) {
    fieldsResult = await graphql(frontmatterQuery(true))
  }

  // console.log(util.inspect(fieldsResult, false, null, true))

  const fields = fieldsResult.data.__type.fields.map(field => field.name)

  const pagesResult = await graphql(`
    {
      allFile {
        edges {
          node {
            relativeDirectory
            childMarkdownRemark {
              frontmatter {
                ${fields.join("\n")}
              }
              html
            }
          }
        }
      }
    }
  `)

  console.log(util.inspect(pagesResult, false, null, true))
  const files = pagesResult.data.allFile.edges

  const { createPage } = actions
  files.forEach(({ node }) => {
    const { relativeDirectory, childMarkdownRemark } = node
    if (!!childMarkdownRemark) {
      const { frontmatter, html } = childMarkdownRemark
      createPage({
        path: "/" + relativeDirectory,
        component: path.resolve(`src/MasterTemplate.js`),
        context: {
          frontmatter,
          html
        }
      })
    }
  })
}
