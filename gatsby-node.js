const path = require(`path`)

const labTemplate = path.resolve(`src/templates/lab.js`)
const labPublicationsTemplate = path.resolve(`src/templates/labpublications.js`)
const labOverviewTemplate = path.resolve(`src/templates/laboverview.js`)
const labMembersTemplate = path.resolve(`src/templates/labmembers.js`)
const memberTemplate = path.resolve(`src/templates/member.js`)
const newsItemTemplate = path.resolve(`src/templates/newsitem.js`)
const calEventTemplate = path.resolve(`src/templates/calevent.js`)

const toPeopleMap = people => {
  let ret = new Object() //new Map()

  people.forEach(person => {
    //ret.set(person.id, person)
    ret[person.frontmatter.id] = person
  })

  return ret
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type GroupsJson implements Node {
      urls: [String!]!
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      titles: [String!]!
      phone: [String!]!
      email: [String!]!
      tags: [String!]!
      urls: [String!]!
      researchAreas: [String!]!
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      labs: allGroupsJson(filter: { type: { eq: "Lab" } }) {
        edges {
          node {
            id
            name
            leaders
            members
            urls
          }
        }
      }

      people: allMarkdownRemark(
        sort: {
          fields: [frontmatter___lastName, frontmatter___firstName]
          order: [ASC, ASC]
        }
        filter: { frontmatter: { tags: { regex: "/People/" } } }
      ) {
        edges {
          node {
            frontmatter {
              id
              firstName
              lastName
              titles
              type
              email
              phone
              researchAreas
              tags
              urls
            }
            excerpt(format: HTML)
            html
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
            url
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

      news: allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { path: { regex: "/news/" } } }
      ) {
        edges {
          node {
            html
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              year: date(formatString: "YYYY")
              month: date(formatString: "MMMM")
              path
              tags
              url
            }
            excerpt(format: HTML)
          }
        }
      }

      events: allMarkdownRemark(
        sort: { fields: frontmatter___start, order: DESC }
        filter: { frontmatter: { tags: { regex: "/Event/" } } }
      ) {
        edges {
          node {
            html
            frontmatter {
              title
              location
              start
              end
              url
              tags
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
  const allNews = []
  const allLabs = []
  const allCalEvents = []

  result.data.people.edges.forEach(({ node }) => {
    allPeople.push(node)
  })

  const peopleMap = toPeopleMap(allPeople)

  result.data.publications.edges.forEach(({ node }) => {
    allPublications.push(node)
  })

  result.data.news.edges.forEach(({ node }) => {
    allNews.push(node)
  })

  result.data.labs.edges.forEach(({ node }) => {
    allLabs.push(node)
  })

  result.data.events.edges.forEach(({ node }) => {
    const calEvent = node

    //calEvent.start = new Date(calEvent.frontmatter.start)
    //calEvent.end = new Date(calEvent.frontmatter.end)

    allCalEvents.push(calEvent)
  })

  const markdownMap = new Map()

  result.data.markdown.edges.forEach(({ node }) => {
    markdownMap.set(node.frontmatter.path, node)
  })

  for (let lab of allLabs) {
    const path = `/research-areas/labs/${lab.id}`

    const labPublications = []

    allPublications.forEach(publication => {
      if (publication.labs.includes(lab.id)) {
        labPublications.push(publication)
      }
    })

    const labPeople = []

    for (let pid of lab.members) {
      labPeople.push(peopleMap[pid])
    }

    let labHtml = ""
    let labExcerptHtml = ""

    if (markdownMap.has(path)) {
      const markdown = markdownMap.get(path)
      labHtml = markdown.html
      labExcerptHtml = markdown.excerpt
    }

    createPage({
      path: `/research-areas/labs/${lab.id}`,
      component: labTemplate,
      context: {
        lab,
        peopleMap,
        labPublications,
        labExcerptHtml,
        labHtml,
      },
    })

    //
    // Overview
    //

    createPage({
      path: `/research-areas/labs/${lab.id}/overview`,
      component: labOverviewTemplate,
      context: {
        lab,
        labPeople,
        peopleMap,
        labPublications,
        labHtml,
      },
    })

    //
    // Members
    //

    createPage({
      path: `${path}/members`,
      component: labMembersTemplate,
      context: {
        lab,
        labPeople,
        peopleMap,
      },
    })

    //
    // Lab publications
    //

    createPage({
      path: `${path}/publications`,
      component: labPublicationsTemplate,
      context: {
        lab,
        peopleMap,
        allPublications,
      },
    })

    //
    // For each person
    //

    for (let pid of lab.members) {
      const person = peopleMap[pid]

      createPage({
        path: `/research-areas/faculty-and-staff/${person.frontmatter.id}`,
        component: memberTemplate,
        context: {
          person,
          lab,
          labPeople,
        },
      })
    }
  }

  //
  // News pages
  //

  for (let item of allNews) {
    createPage({
      path: item.frontmatter.path,
      component: newsItemTemplate,
      context: {
        item,
        allNews,
      },
    })
  }

  //
  // Events pages
  //

  for (let calEvent of allCalEvents) {
    const path = `/events/${
      calEvent.frontmatter.start.split("T")[0]
    }-${calEvent.frontmatter.title.toLowerCase().replace(" ", "-")}`

    createPage({
      path: path,
      component: calEventTemplate,
      context: {
        calEvent,
        allCalEvents,
      },
    })
  }
}
