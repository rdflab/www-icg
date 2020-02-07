const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const labTemplate = path.resolve(`src/templates/lab.js`)
  
  
  const results = await graphql(`
    query {
      faculty: allFacultyJson {
        edges {
          node {
            labId
            name
          }
        }
      }

      publications: allPublicationsJson {
        edges {
          node {
            labId
            publications {
              title
              journal
              date
              url
              volume
              issue
              pages
              authors
            }
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

  const faculty = results.data.faculty.edges
  const allPublications = results.data.publications.edges

  faculty.forEach(({ node }) => {
    console.log('cake', node)

    const labId = node.labId
    const name = node.name
    
    var publications = []

    allPublications.forEach(({ node }) => {
      if (node.labId === labId) {
        publications = node.publications
      }
    })

    console.log("Making ", labId, publications)

    createPage({
      path: `/research-areas/labs/${labId}`,
      component: labTemplate,
      context: {
        labId: labId,
        name: name,
        publications: publications
      }, // additional data can be passed via context
    })
  })
}