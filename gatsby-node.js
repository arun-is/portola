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

  console.log(util.inspect(fieldsResult, false, null, true))

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
  //console.log(util.inspect(markDownFiles, false, null, true))

  const { createPage } = actions
  markDownFiles.forEach(({ node }) => {
    const { frontmatter, html } = node
    createPage({
      path: "/",
      component: path.resolve(`src/components/MasterTemplate.js`),
      context: {
        frontmatter,
        html
      }
    })
  })
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
