const path = require(`path`)

const labTemplate = path.resolve(`src/templates/lab.js`)
const labPublicationsTemplate = path.resolve(`src/templates/labpublications.js`)
const labMembersTemplate = path.resolve(`src/templates/labmembers.js`)
const memberTemplate = path.resolve(`src/templates/member.js`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  
  const result = await graphql(`
    query {
      labs: allLabsJson {
        edges {
          node {
            id
            name
            faculty
            uri
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
            tags
            uri
          }
        }
      }

      markdown: allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              path
            }
            excerpt(format: HTML)
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

  result.data.people.edges.forEach(({ node }) => {
    allPeople.push(node)
  })

  result.data.publications.edges.forEach(({ node }) => {
    allPublications.push(node)
  })

  const markdownMap = new Map()

  result.data.markdown.edges.forEach(({ node }) => {
    markdownMap.set(node.frontmatter.path, node)
  })

  result.data.labs.edges.forEach(({ node }) => {
    const lab = node

    const path = `/research-areas/labs/${lab.id}`

    let labHtml = ""
    let labExcerptHtml = ""

    if (markdownMap.has(path)) {
      const markdown = markdownMap.get(path)
      labHtml = markdown.html
      labExcerptHtml = markdown.excerpt
    }

    console.log("make page " + `/research-areas/labs/${lab.id}`)

    createPage({
      path: `/research-areas/labs/${lab.id}`,
      component: labTemplate,
      context: {
        lab,
        allPeople,
        allPublications,
        labExcerptHtml,
        labHtml,
      }, // additional data can be passed via context
    })

    createPage({
      path: `${path}/publications`,
      component: labPublicationsTemplate,
      context: {
        lab,
        allPeople,
        allPublications,
      }, // additional data can be passed via context
    })

    createPage({
      path: `/research-areas/labs/${lab.id}/members`,
      component: labMembersTemplate,
      context: {
        lab,
        allPeople,
      }, // additional data can be passed via context
    })
  })

  for (let person of allPeople) {
    createPage({
      path: `/research-areas/faculty-and-staff/${person.id}`,
      component: memberTemplate,
      context: {
        person
      }, // additional data can be passed via context
    })
  }
}
