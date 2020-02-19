const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const labTemplate = path.resolve(`src/templates/lab.js`)
  const labPublicationsTemplate = path.resolve(`src/templates/labpublications.js`)
  const labMembersTemplate = path.resolve(`src/templates/labmembers.js`)
  
  const result = await graphql(`
    query {
      labs: allLabsJson {
        edges {
          node {
            id
            name
            faculty
          }
        }
      }

      people: allPeopleJson {
        edges {
          node {
            id
            firstName
            lastName
            email
            phoneNumbers
            titles
            postNominalLetters
            tags
            labs
          }
        }
      }

      publications: allPublicationsJson {
        edges {
          node {
            authors {
              corresponding
              initials
              lastName
            }
            labs
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

  const allPeople = []
  const allPublications = []
  
  result.data.people.edges.forEach(({node}) => {
    allPeople.push(node)
  })

  result.data.publications.edges.forEach(({node}) => {
    allPublications.push(node)
  })

  result.data.labs.edges.forEach(({node}) => {
    const lab = node

    console.log('make page ' + `/research-areas/labs/${lab.id}`)

    createPage({
      path: `/research-areas/labs/${lab.id}`,
      component: labTemplate,
      context: {
        lab,
        allPeople,
        allPublications
      }, // additional data can be passed via context
    });

    createPage({
      path: `/research-areas/labs/${lab.id}/publications`,
      component: labPublicationsTemplate,
      context: {
        lab,
        allPeople,
        allPublications
      }, // additional data can be passed via context
    });

    createPage({
      path: `/research-areas/labs/${lab.id}/members`,
      component: labMembersTemplate,
      context: {
        lab,
        allPeople
      }, // additional data can be passed via context
    });
  })
}