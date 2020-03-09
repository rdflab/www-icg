const path = require(`path`)

const PEOPLE_TYPES = [
  "Faculty",
  "Research Scientist",
  "Graduate Student",
  "Staff",
]

const labTemplate = path.resolve(`src/templates/lab.js`)
const labsTemplate = path.resolve(`src/templates/labsv2.js`)
const FacultyAndStaffTemplate = path.resolve(
  `src/templates/facultyandstaffv2.js`
)
const labPublicationsTemplate = path.resolve(`src/templates/labpublications.js`)
const labOverviewTemplate = path.resolve(`src/templates/laboverview.js`)
const labMembersTemplate = path.resolve(`src/templates/labmembers.js`)
const memberTemplate = path.resolve(`src/templates/member.js`)
const newsTemplate = path.resolve(`src/templates/news.js`)
const newsItemTemplate = path.resolve(`src/templates/newsitem.js`)
const calEventsTemplate = path.resolve(`src/templates/calevents.js`)
const calEventTemplate = path.resolve(`src/templates/calevent.js`)
const publicationsTemplate = path.resolve(`src/templates/publicationsv2.js`)
const researchAreasTemplate = path.resolve(`src/templates/researchareasv2.js`)
const researchAreaTemplate = path.resolve(`src/templates/researchareav2.js`)

const toPeopleMap = people => {
  let ret = new Object() //new Map()

  people.forEach(person => {
    //ret.set(person.id, person)
    ret[person.frontmatter.id] = person
  })

  return ret
}

const toPeopleTypeMap = people => {
  const ret = {}

  for (let type of PEOPLE_TYPES) {
    ret[type] = []
  }

  for (let person of people) {
    const t = person.frontmatter.type

    if (!(t in ret)) {
      ret[this] = []
    }

    ret[t].push(person)
  }

  return ret
}

const toGroupMap = groups => {
  let ret = {}

  for (let group of groups) {
    ret[group.frontmatter.id] = group
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
      groups: [String!]!
      people: [String!]!
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
      labGroups: allMarkdownRemark(
        sort: { fields: frontmatter___name, order: ASC }
        filter: { frontmatter: { type: { eq: "Lab" } } }
      ) {
        edges {
          node {
            frontmatter {
              id
              name
              leaders
              members
              urls
            }
            excerpt(format: HTML)
            html
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

      publications: allPublicationsJson(sort: { fields: year, order: DESC }) {
        edges {
          node {
            authors {
              corresponding
              initials
              lastName
            }
            groups
            people
            journal
            issue
            pages
            title
            volume
            year
            tags
            pubmed
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
              groups
              people
              path
              tags
              urls
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
              urls
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
  const allLabGroups = []
  const allCalEvents = []
  const allResearchAreas = []
  const researchAreasMap = {}

  result.data.researchAreas.edges.forEach(({ node }) => {
    allResearchAreas.push(node)
    researchAreasMap[node.id] = node
  })

  result.data.people.edges.forEach(({ node }) => {
    const person = node

    let ras = {}

    for (let ra of person.frontmatter.researchAreas) {
      if (ra in researchAreasMap) {
        ras[researchAreasMap[ra].name] = researchAreasMap[ra]
      }
    }

    person.researchAreas = Object.keys(ras)
      .sort()
      .map(key => {
        return ras[key]
      })

    allPeople.push(person)
  })

  const peopleMap = toPeopleMap(allPeople)

  result.data.publications.edges.forEach(({ node }) => {
    allPublications.push(node)
  })

  result.data.news.edges.forEach(({ node }) => {
    allNews.push(node)
  })

  result.data.labGroups.edges.forEach(({ node }) => {
    allLabGroups.push(node)
  })

  const groupMap = toGroupMap(allLabGroups)

  result.data.events.edges.forEach(({ node }) => {
    const calEvent = node

    //calEvent.start = new Date(calEvent.frontmatter.start)
    //calEvent.end = new Date(calEvent.frontmatter.end)

    allCalEvents.push(calEvent)
  })

  const markdownMap = {}

  result.data.markdown.edges.forEach(({ node }) => {
    markdownMap[node.frontmatter.path] = node
  })

  //
  // Index some data for searching
  //

  const searchData = {}
  searchData["sections"] = []
  searchData["data"] = {}

  // Labs

  searchData["sections"].push("Labs")
  searchData["data"]["Labs"] = {}

  for (let group of allLabGroups) {
    searchData["data"]["Labs"][group.frontmatter.name] = {
      name: "Lab page",
      to: `/research-areas/labs/${group.frontmatter.id}`,
    }
  }

  // Research areas

  searchData["sections"].push("Research Areas")
  searchData["data"]["Research Areas"] = {}

  for (let ra of allResearchAreas) {
    searchData["data"]["Research Areas"][ra.name] = {
      name: "Research page",
      to: `/research-areas/${ra.id}`,
    }
  }

  // People types

  const peopleTypeMap = toPeopleTypeMap(allPeople)

  for (let type of PEOPLE_TYPES) {
    searchData["sections"].push(type)
    searchData["data"][type] = {}

    for (let person of peopleTypeMap[type]) {
      const name = `${person.frontmatter.firstName} ${person.frontmatter.lastName}`

      //const groupId = `${person.frontmatter.id}-lab`
      // if (groupId in groupMap) {
      //   searchData["data"][type][name].push({
      //     name: "Lab",
      //     to: `/research-areas/labs/${groupId}`,
      //   })
      // }

      searchData["data"][type][name] = {
        name: `${person.frontmatter.titles[0]}`,
        to: `/research-areas/faculty-and-staff/${person.frontmatter.id}`,
      }
    }
  }

  //
  // Make pages
  //

  for (let group of allLabGroups) {
    const path = `/research-areas/labs/${group.frontmatter.id}`

    const labPublications = []

    allPublications.forEach(publication => {
      if (publication.groups.includes(group.frontmatter.id)) {
        labPublications.push(publication)
      }
    })

    const labPeople = []

    for (let pid of group.frontmatter.members) {
      labPeople.push(peopleMap[pid])
    }

    const labNews = []

    for (item of allNews) {
      if (item.frontmatter.groups.includes(group.frontmatter.id)) {
        labNews.push(item)
      }
    }

    let labHtml = ""
    let labExcerptHtml = ""

    if (path in markdownMap) {
      const markdown = markdownMap[path]
      labHtml = markdown.html
      labExcerptHtml = markdown.excerpt
    }

    createPage({
      path: `/research-areas/labs/${group.frontmatter.id}`,
      component: labTemplate,
      context: {
        group: group,
        groupMap: groupMap,
        peopleMap: peopleMap,
        labPublications: labPublications,
        labNews: labNews,
        labExcerptHtml: labExcerptHtml,
        labHtml: labHtml,
        searchData: searchData,
      },
    })

    //
    // Overview
    //

    createPage({
      path: `/research-areas/labs/${group.frontmatter.id}/overview`,
      component: labOverviewTemplate,
      context: {
        group: group,
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
        group: group,
        labPeople: labPeople,
        peopleMap: peopleMap,
        searchData: searchData,
      },
    })

    //
    // Lab publications
    //

    createPage({
      path: `${path}/publications`,
      component: labPublicationsTemplate,
      context: {
        group: group,
        peopleMap: peopleMap,
        allPublications: allPublications,
      },
    })

    //
    // For each person
    //

    for (let pid of group.frontmatter.members) {
      const person = peopleMap[pid]

      const personPublications = []

      allPublications.forEach(publication => {
        if (publication.people.includes(person.frontmatter.id)) {
          personPublications.push(publication)
        }
      })

      createPage({
        path: `/research-areas/faculty-and-staff/${person.frontmatter.id}`,
        component: memberTemplate,
        context: {
          id: person.frontmatter.id,
          person: person,
          group: group,
          groupMap: groupMap,
          labPeople: labPeople,
          peopleMap: peopleMap,
          publications: personPublications,
        },
      })
    }
  }

  //
  // News pages
  //

  createPage({
    path: `/news`,
    component: newsTemplate,
    context: {
      allNews: allNews,
    },
  })

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

  createPage({
    path: "/events",
    component: calEventsTemplate,
    context: {
      allCalEvents: allCalEvents,
    },
  })

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
      allGroups: allLabGroups,
      peopleMap: peopleMap,
      searchData: searchData,
    },
  })

  // Faculty and Staff page

  createPage({
    path: "/research-areas/faculty-and-staff",
    component: FacultyAndStaffTemplate,
    context: {
      groupMap: groupMap,
      allPeople: allPeople,
      searchData: searchData,
    },
  })

  // Pubs page

  createPage({
    path: "/research-areas/publications",
    component: publicationsTemplate,
    context: {
      groupMap: groupMap,
      peopleMap: peopleMap,
      allPublications: allPublications,
    },
  })

  //
  // Research areas
  //

  createPage({
    path: "/research-areas",
    component: researchAreasTemplate,
    context: {
      allResearchAreas: allResearchAreas,
      searchData: searchData,
    },
  })

  for (let researchArea of allResearchAreas) {
    createPage({
      path: `/research-areas/${researchArea.id}`,
      component: researchAreaTemplate,
      context: {
        groupMap: groupMap,
        allPeople: allPeople,
        researchArea: researchArea,
        searchData: searchData,
      },
    })
  }
}
