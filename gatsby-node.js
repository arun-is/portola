const path = require("path")
const util = require("util")

exports.createPages = async ({ actions, graphql }) => {
  const fieldsResult = await graphql(`
    {
      __type(name: "frontmatter") {
        name
        fields {
          name
        }
      }
      allFile {
        edges {
          node {
            id
            relativePath
          }
        }
      }
    }
  `)
  const fields = fieldsResult.data.__type.fields.map(field => field.name)

  const pagesResult = await graphql(`
  {
    allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              ${fields.join("\n")}
            }
            html
          }
        }
      }
  }
  `)
  const markDownFiles = pagesResult.data.allMarkdownRemark.edges
  console.log(util.inspect(markDownFiles, false, null, true))
}

// async/await

// exports.createPages = async ({ actions, graphql }) => {
//     const { createPage } = actions

//     const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

//     const result = await graphql(`
//       {
//         allMarkdownRemark(
//           sort: { order: DESC, fields: [frontmatter___date] }
//           limit: 1000
//         ) {
//           edges {
//             node {
//               frontmatter {
//                 path
//               }
//             }
//           }
//         }
//       }.
//     `)

//     if (result.errors) {
//       return Promise.reject(result.errors)
//     }

//     result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//       createPage({
//         path: node.frontmatter.path,
//         component: blogPostTemplate,
//         context: {} // additional data can be passed via context
//       })
//     })
//   }

// promised based below:

// exports.createPages = ({ actions, graphql }) => {
//     const { createPage } = actions

//     const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

//     return graphql(`
//       {
//         allMarkdownRemark(
//           sort: { order: DESC, fields: [frontmatter___date] }
//           limit: 1000
//         ) {
//           edges {
//             node {
//               frontmatter {
//                 path
//               }
//             }
//           }
//         }
//       }
//     `).then(result => {
//       if (result.errors) {
//         return Promise.reject(result.errors)
//       }

//       result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//         createPage({
//           path: node.frontmatter.path,
//           component: blogPostTemplate,
//           context: {}, // additional data can be passed via context
//         })
//       })
//     })
//   }
