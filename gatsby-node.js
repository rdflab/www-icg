const path = require(`path`)

const labTemplate = path.resolve(`src/templates/lab.js`)
const labsTemplate = path.resolve(`src/templates/labs.js`)
const facultyAndStaffTemplate = path.resolve(
  `src/templates/faculty-and-staff.js`
)
const labPublicationsTemplate = path.resolve(`src/templates/labpublications.js`)
const labOverviewTemplate = path.resolve(`src/templates/laboverview.js`)
const labMembersTemplate = path.resolve(`src/templates/labmembers.js`)
const memberTemplate = path.resolve(`src/templates/member.js`)
const newsItemTemplate = path.resolve(`src/templates/newsitem.js`)
const calEventTemplate = path.resolve(`src/templates/calevent.js`)
const publicationsTemplate = path.resolve(`src/templates/publications.js`)
const researchAreasTemplate = path.resolve(`src/templates/research-areas.js`)
const researchAreaTemplate = path.resolve(`src/templates/research-area.js`)

const toPeopleMap = people => {
  let ret = new Object() //new Map()

  people.forEach(person => {
    //ret.set(person.id, person)
    ret[person.frontmatter.id] = person
  })

  return ret
}

const toLabMap = labs => {
  let ret = {}

  for (let lab of labs) {
    ret[lab.id] = lab
  }

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
      letters: [String!]!
      tags: [String!]!
      urls: [String!]!
      researchAreas: [String!]!
      start: Date
      end: Date
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
              letters
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

      researchAreas: allResearchAreasJson {
        edges {
          node {
            id
            name
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
  const allResearchAreas = []
  const researchAreasMap = {}

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

  const labMap = toLabMap(allLabs)

  result.data.events.edges.forEach(({ node }) => {
    const calEvent = node

    //calEvent.start = new Date(calEvent.frontmatter.start)
    //calEvent.end = new Date(calEvent.frontmatter.end)

    allCalEvents.push(calEvent)
  })

  result.data.researchAreas.edges.forEach(({ node }) => {
    allResearchAreas.push(node)
    researchAreasMap[node.id] = node
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
        lab: lab,
        peopleMap: peopleMap,
        labPublications: labPublications,
        labExcerptHtml: labExcerptHtml,
        labHtml: labHtml,
      },
    })

    //
    // Overview
    //

    createPage({
      path: `/research-areas/labs/${lab.id}/overview`,
      component: labOverviewTemplate,
      context: {
        lab: lab,
        labPeople: labPeople,
        peopleMap: peopleMap,
        labPublications: labPublications,
        labHtml: labHtml,
      },
    })

    //
    // Members
    //

    createPage({
      path: `${path}/members`,
      component: labMembersTemplate,
      context: {
        lab: lab,
        labPeople: labPeople,
        peopleMap: peopleMap,
      },
    })

    //
    // Lab publications
    //

    createPage({
      path: `${path}/publications`,
      component: labPublicationsTemplate,
      context: {
        lab: lab,
        peopleMap: peopleMap,
        allPublications: allPublications,
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
          person: person,
          lab: lab,
          labPeople: labPeople,
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
        item: item,
        allNews: allNews,
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
        calEvent: calEvent,
        allCalEvents: allCalEvents,
      },
    })
  }

  // Labs page

  createPage({
    path: "/research-areas/labs",
    component: labsTemplate,
    context: {
      allLabs: allLabs,
      peopleMap: peopleMap,
    },
  })

  // Faculty and Staff page

  createPage({
    path: "/research-areas/faculty-and-staff",
    component: facultyAndStaffTemplate,
    context: {
      allLabs: allLabs,
      allPeople: allPeople,
    },
  })

  // Pubs page

  createPage({
    path: "/research-areas/publications",
    component: publicationsTemplate,
    context: {
      allLabs: allLabs,
      peopleMap: peopleMap,
      allPublications: allPublications,
    },
  })

  console.log(allResearchAreas)

  createPage({
    path: "/research-areas",
    component: researchAreasTemplate,
    context: {
      allResearchAreas: allResearchAreas,
    },
  })

  for (let researchArea of allResearchAreas) {
    createPage({
      path: `/research-areas/${researchArea.id}`,
      component: researchAreaTemplate,
      context: {
        labMap: labMap,
        allPeople: allPeople,
        researchArea: researchArea,
      },
    })
  }
}
