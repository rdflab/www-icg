const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const labTemplate = path.resolve(`src/templates/lab.js`)
  
  
  const results = await graphql(`
    query {
      allFaculty: allFacultyJson {
        edges {
          node {
            labId
            firstName
            lastName
            email
          }
        }
      }

      allPublications: allPublicationsJson {
        edges {
          node {
            authors {
              corresponding
              initials
              lastName
            }
            labId
            journal
            issue
            pages
            title
            volume
            year
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

  const allFaculty = results.data.allFaculty.edges
  const allPublications = results.data.allPublications.edges

  allFaculty.forEach(({ node }) => {
    const member = node

    createPage({
      path: `/research-areas/labs/${member.labId}`,
      component: labTemplate,
      context: {
        labId: member.labId,
        member: member
      }, // additional data can be passed via context
    })
  })
}