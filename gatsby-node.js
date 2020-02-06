const path = require(`path`)
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const facultyTemplate = path.resolve(`src/templates/faculty.js`)
  
  
  const result = await graphql(`
    query {
      faculty: allFacultyJson {
        edges {
          node {
            lab_id
          }
        }
      }
    }
  `)


  // Handle errors
  // if (result.errors) {
  //   reporter.panicOnBuild(`Error while running GraphQL query.`)
  //   return
  // }

  // result.data.allMarkdownRemark.edges.forEach(({ node }) => {
  //   createPage({
  //     path: node.frontmatter.path,
  //     component: facultyTemplate,
  //     context: {}, // additional data can be passed via context
  //   })
  // })

  console.log(result)

  result.data.faculty.edges.forEach(({ node }) => {
    console.log('cake', node)
    createPage({
      path: `/faculty/${node.lab_id}`,
      component: facultyTemplate,
      context: {
        labId: node.lab_id
      }, // additional data can be passed via context
    })
  })
}