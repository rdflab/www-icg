const path = require(`path`)
var fs = require("fs")

const GROUPS = [
  "Faculty",
  "Administrator",
  "Administrative Staff",
  "Research Staff",
  "Graduate Students",
  "Students",
]

const indexTemplate = path.resolve(`src/templates/indextemplate.js`)
const labTemplate = path.resolve(`src/templates/labtemplate.js`)
const labPeopleTemplate = path.resolve(`src/templates/labpeopletemplate.js`)
const allLabsTemplate = path.resolve(`src/templates/alllabstemplate.js`)
const facultyShortTemplate = path.resolve(
  `src/templates/facultyshorttemplate.js`
)
const facultyLongTemplate = path.resolve(`src/templates/facultylongtemplate.js`)
const allFacultyTemplate = path.resolve(`src/templates/allfacultytemplate.js`)
const adminTemplate = path.resolve(`src/templates/admintemplate.js`)
const adminStaffTemplate = path.resolve(`src/templates/adminstafftemplate.js`)
const peopleTemplate = path.resolve(`src/templates/peopletemplate.js`)
//const groupTemplate = path.resolve(`src/templates/grouptemplate.js`)
//const labOverviewTemplate = path.resolve(`src/templates/laboverviewtemplate.js`)
const personTemplate = path.resolve(`src/templates/persontemplate.js`)
const newsTemplate = path.resolve(`src/templates/newstemplate.js`)
const newsItemTemplate = path.resolve(`src/templates/newsitemtemplate.js`)
const calEventsTemplate = path.resolve(`src/templates/caleventstemplate.js`)
const calEventTemplate = path.resolve(`src/templates/caleventtemplate.js`)
const publicationsTemplate = path.resolve(
  `src/templates/publicationstemplate.js`
)
const researchAreasTemplate = path.resolve(
  `src/templates/researchareastemplate.js`
)
const researchAreaTemplate = path.resolve(
  `src/templates/researchareatemplate.js`
)
const helpTemplate = path.resolve(`src/templates/helptemplate.js`)

const toContextMap = (items) => {
  const contextMap = {}

  for (let i = 0; i < items.length; ++i) {
    let item = items[i]
    const tokens = item.split("::")
    let context = "default"
    let name = ""
    if (tokens.length > 1) {
      context = tokens[0]
      name = tokens[1]
    } else {
      name = tokens[0]
    }

    // The first item we encounter is always added in the default
    // context
    if (i === 0) {
      contextMap["default"] = name
    }

    contextMap[context] = name
  }

  return contextMap
}

const toPeopleMap = (people) => {
  let ret = {}

  people.forEach((person) => {
    //ret.set(person.id, person)
    ret[person.frontmatter.id] = person
  })

  return ret
}

const toLabPeopleMap = (lab, peopleMap) => {
  const ret = {}

  for (let group of lab.groups) {
    ret[group.name] = group.people.map((pid) => peopleMap[pid])
  }

  return ret
}

const getContextName = (contextMap, context) => {
  let ret = ""

  if (context in contextMap) {
    ret = contextMap[context]
  } else {
    // Look for default value
    if ("default" in contextMap) {
      ret = contextMap["default"]
    }
  }

  return ret
}

// const toGroupMap = (allFaculty) => {
//   const ret = {}

//   for (let group of allFaculty) {
//     if (!(group in ret)) {
//       ret[group] = []
//     }

//     for (let personId of group.people) {
//       ret[group].push(personId)
//     }
//   }

//   return ret
// }

// const createSuffixTree = (root, text, item) => {
//   const words = text.toLowerCase().split(" ")

//   for (let word of words) {
//     for (let j = 0; j < word.length; ++j) {
//       let node = root

//       const suffix = word.substring(j)

//       for (let k = 0; k < suffix.length; k++) {
//         const c = suffix.charAt(k)

//         if (!(c in node[0])) {
//           node[0][c] = [{}, []]
//         }

//         node = node[0][c]

//         if (k > 0) {
//           if (!node[1].includes(item)) {
//             node[1].push(item)
//           }
//         }
//       }
//     }
//   }
// }

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type StaffGroups {
      name: String!
      people: [String!]!
    }

    type LabsJson implements Node {
      name: String!
      groups: [StaffGroups!]!
    }

    type AdministrationJson implements Node {
      name: String!
      groups: [StaffGroups!]!
    }

    type Appointment {
      institute: String!
      title: String!
      url: String!
    }

    type AppointmentsJson implements Node {
      id: String!
      appointments: [Appointment!]!
    }

    type PeopleJson implements Node {
      name: String!
      people: [String!]!
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Training {
      year: Int!
      title: String!
      notes: [String!]!
    }

    type Frontmatter {
      id: String!
      name: String!
      firstName: String!
      lastName: String!
      title: String!
      institute: String!
      titles: [String!]
      postNominalLetters: String!
      tags: [String!]!
      room: String!
      url: String!
      notes: [String!]!
      people: [String!]!
      researchAreas: [String!]!
      training: [Training!]!
      authors: [String!]!
      year: Int!
      startDate: Date!
    }
  `
  createTypes(typeDefs)
}

// faculty: allFacultyJson {
//   edges {
//     node {
//       id
//       name
//       url
//       faculty {
//         id
//         labId
//       }
//     }
//   }
// }

// faculty: allMarkdownRemark(
//   sort: {
//     fields: [frontmatter___lastName, frontmatter___firstName]
//     order: [ASC, ASC]
//   }
//   filter: { fileAbsolutePath: { regex: "/faculty/" } }
// ) {
//   edges {
//     node {
//       frontmatter {
//         id
//         labId
//         name
//         group
//         email
//         phone
//         fax
//         room
//         tags
//         url
//       }
//       excerpt(format: HTML)
//       html
//     }
//   }
// }

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          facultyGroups
          paths {
            adminPath
            researchAreasPath
            publicationsPath
            peoplePath
            newsPath
            labsPath
            facultyStaffPath
            facultyPath
            eventsPath
            adminStaffPath
          }
        }
      }

      people: allMarkdownRemark(
        sort: {
          fields: [frontmatter___lastName, frontmatter___firstName]
          order: [ASC, ASC]
        }
        filter: { fileAbsolutePath: { regex: "/people/" } }
      ) {
        edges {
          node {
            frontmatter {
              id
              firstName
              lastName
              titles
              postNominalLetters
              email
              phone
              fax
              room
              pubmed
              researchAreas
              tags
              url
            }
            excerpt(format: HTML)
            html
          }
        }
      }

      faculty: allFacultyJson {
        edges {
          node {
            id
            name
            people {
              person
              lab
            }
          }
        }
      }

      facultyMarkdown: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/faculty/" } }
      ) {
        edges {
          node {
            html
            frontmatter {
              id
            }
            excerpt(format: HTML)
          }
        }
      }

      labs: allLabsJson {
        edges {
          node {
            id
            name
            groups {
              name
              people
            }
          }
        }
      }

      peopleOrdered: allPeopleJson {
        edges {
          node {
            name
            people
          }
        }
      }

      admin: allAdministrationJson {
        edges {
          node {
            name
            groups {
              name
              people
            }
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

      publications: allPublicationsJson(sort: { fields: year, order: DESC }) {
        edges {
          node {
            authors
            people
            journal
            issue
            pages
            title
            volume
            year
            pubmed
            url
            tags
          }
        }
      }

      cv: allCvJson {
        edges {
          node {
            id
            education {
              year
              title
            }
            training {
              year
              title
            }
            experience {
              year
              title
            }
            awards {
              year
              title
            }
          }
        }
      }

      appointments: allAppointmentsJson {
        edges {
          node {
            id
            appointments {
              institute
              title
              url
            }
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

      news: allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { fileAbsolutePath: { regex: "/news/" } }
      ) {
        edges {
          node {
            html
            frontmatter {
              title
              date(formatString: "MMM DD, YYYY")
              year: date(formatString: "YYYY")
              people
              path
              tags
              url
            }
            excerpt(format: HTML)
          }
        }
      }

      events: allMarkdownRemark(
        sort: { fields: frontmatter___start, order: ASC }
        filter: { fileAbsolutePath: { regex: "/events/" } }
      ) {
        edges {
          node {
            html
            frontmatter {
              title
              location
              start
              date: start(formatString: "MMM DD, YYYY")
              day: start(formatString: "D")
              weekday: start(formatString: "ddd")
              month: start(formatString: "MMM")
              monthNum: start(formatString: "M")
              year: start(formatString: "YYYY")
              startTime: start(formatString: "h:mm A")
              end
              endTime: end(formatString: "h:mm A")
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

  result.data.people.edges.forEach(({ node }) => {
    const person = node

    // Add name to front matter
    person.frontmatter.name = `${person.frontmatter.firstName} ${person.frontmatter.lastName}`

    person.titleMap = toContextMap(person.frontmatter.titles)
    //person.groups = toContextMap(person.frontmatter.groups)
    //person.formatMap = toContextMap(person.frontmatter.formats)

    allPeople.push(person)
  })

  const peopleMap = toPeopleMap(allPeople)

  //const groupMap = toGroupMap(allFaculty)

  // const allResearchAreas = []
  // const researchAreasMap = {}
  // result.data.researchAreas.edges.forEach(({ node }) => {
  //   allResearchAreas.push(node)
  //   researchAreasMap[node.id] = node
  // })

  const cvMap = {}
  result.data.cv.edges.forEach(({ node }) => {
    cvMap[node.id] = node
  })

  const appointmentsMap = {}
  result.data.appointments.edges.forEach(({ node }) => {
    appointmentsMap[node.id] = node
  })

  const allLabs = []
  const labMap = {}
  let facultyStaff = []
  const sortedPeopleGroupMap = {}

  result.data.labs.edges.forEach(({ node }) => {
    const lab = node

    lab.groupMap = toLabPeopleMap(lab, peopleMap)

    facultyStaff = facultyStaff.concat(lab.groupMap["Faculty"])
    facultyStaff = facultyStaff.concat(lab.groupMap["Research Staff"])

    allLabs.push(lab)
    labMap[lab.id] = lab
  })

  const allFaculty = []

  result.data.faculty.edges.forEach(({ node }) => {
    const faculty = node
    allFaculty.push(faculty)
  })

  const facultyMarkdownMap = {}

  result.data.facultyMarkdown.edges.forEach(({ node }) => {
    facultyMarkdownMap[node.frontmatter.id] = node
  })

  const allAdmin = []
  result.data.admin.edges.forEach(({ node }) => {
    const admin = node
    allAdmin.push(admin)
  })

  const allNews = []
  result.data.news.edges.forEach(({ node }) => {
    const item = node

    //item.date = new Date(Date.parse(item.frontmatter.date))

    allNews.push(item)
  })

  const allCalEvents = []
  result.data.events.edges.forEach(({ node }) => {
    const calEvent = node

    //calEvent.start = new Date(calEvent.frontmatter.start)
    //calEvent.end = new Date(calEvent.frontmatter.end)

    allCalEvents.push(calEvent)
  })

  let admin = allAdmin[0]
  admin.groupMap = toLabPeopleMap(admin, peopleMap)

  //const adminPeople = admin.people.map((pid) => peopleMap[pid])
  //const adminGroupMap = toGroupMap(adminPeople)

  // Add groups to person
  // for (let person of allPeople) {
  //   if (person.frontmatter.id in personGroups) {
  //     person.groups = personGroups[person.frontmatter.id]
  //   } else {
  //     person.groups = []
  //   }
  // }

  const allPublications = []
  const personPubMap = {}
  //const labPubMap = {}

  result.data.publications.edges.forEach(({ node }) => {
    const publication = node

    // replace labs refs with labs objs

    // for (let labId of publication.labs) {
    //   if (labId in labMap) {
    //     if (!(labId in labPubMap)) {
    //       labPubMap[labId] = []
    //     }

    //     labPubMap[labId].push(publication)
    //   }
    // }

    for (let pid of publication.people) {
      if (pid in peopleMap) {
        if (!(pid in personPubMap)) {
          personPubMap[pid] = []
        }

        personPubMap[pid].push(publication)
      }
    }

    allPublications.push(publication)
  })

  const markdownMap = {}

  result.data.markdown.edges.forEach(({ node }) => {
    markdownMap[node.frontmatter.path] = node
  })

  //
  // Make pages
  //

  const paths = result.data.site.siteMetadata.paths

  let path

  //
  // Index
  //

  createPage({
    path: "/",
    component: indexTemplate,
    context: {
      director: peopleMap["riccardo-dalla-favera"],
      allCalEvents: allCalEvents,
      nEvents: 4,
      allPublications: allPublications,
      nPublications: 4,
    },
  })

  //
  // People
  //

  // Build a table of all people
  const allPeopleGroupMap = {}

  result.data.peopleOrdered.edges.forEach(({ node }) => {
    const group = node
    allPeopleGroupMap[group.name] = group.people.map((id) => peopleMap[id])
  })

  createPage({
    path: paths.peoplePath,
    component: peopleTemplate,
    context: {
      crumbs: [["People", paths.peoplePath]],
      nav: "People",
      title: "Meet Our People",
      allPeople: allPeople,
      groupMap: allPeopleGroupMap,
    },
  })

  for (let person of allPeople) {
    const pid = person.frontmatter.id

    createPage({
      path: `${paths.peoplePath}/${pid}`,
      component: personTemplate,
      context: {
        id: pid,
        person: person,
        publications: pid in personPubMap ? personPubMap[pid] : [],
        cv: pid in cvMap ? cvMap[pid] : null,
      },
    })
  }

  //
  // Research areas
  //

  createPage({
    path: paths.researchAreasPath,
    component: researchAreasTemplate,
    context: {
      allResearchAreas: [],
    },
  })

  //
  // Faculty
  //

  createPage({
    path: paths.facultyPath,
    component: allFacultyTemplate,
    context: {
      title: "Faculty",
      crumbs: [["Faculty", paths.facultyPath]],
      allFaculty: allFaculty,
      peopleMap: peopleMap,
    },
  })

  for (let group of allFaculty) {
    for (let faculty of group.people) {
      path = `${paths.facultyPath}/${faculty.person}`

      const person = peopleMap[faculty.person]
      const lab = labMap[faculty.lab]

      const facultyPublications =
        faculty.person in personPubMap ? personPubMap[faculty.person] : []

      const labNews = allNews.filter((item) =>
        item.frontmatter.people.includes(faculty.person)
      )

      // let html = ""
      // let excerptHtml = ""

      // if (personId in facultyMarkdownMap) {
      //   const markdown = facultyMarkdownMap[personId]
      //   html = markdown.html
      //   excerptHtml = markdown.excerpt
      // }

      let template

      if (person.frontmatter.tags.includes("page-format::short")) {
        template = facultyShortTemplate
      } else {
        template = facultyLongTemplate
      }

      createPage({
        path: path,
        component: template,
        context: {
          crumbs: [
            ["Faculty", paths.facultyPath],
            [person.frontmatter.name, path],
          ],
          id: faculty.person,
          person: peopleMap[faculty.person],
          lab: lab,
          cv: faculty.person in cvMap ? cvMap[faculty.person] : null,
          appointments:
            faculty.person in appointmentsMap
              ? appointmentsMap[faculty.person]
              : null,
          peopleMap: peopleMap,
          publications: facultyPublications,
          labNews: labNews,
        },
      })

      //
      // Lab publications
      //
      const pubPath = `${path}/publications`
      createPage({
        path: pubPath,
        component: publicationsTemplate,
        context: {
          title: `${person.frontmatter.name} Publications`,
          crumbs: [
            ["Faculty", paths.facultyPath],
            [person.frontmatter.name, path],
            ["Publications", pubPath],
          ],
          selectedTab: "",
          allPublications: facultyPublications,
          showSearch: false,
          showYears: true,
          showLabLink: false,
        },
      })
    }
  }

  // createPage({
  //   path: paths.facultyStaffPath,
  //   component: peopleTemplate,
  //   context: {
  //     crumbs: [["Faculty & Staff", paths.facultyStaffPath]],
  //     nav: "For Research Scientists",
  //     title: "Meet Our Faculty & Staff",
  //     allPeople: facultyStaff,
  //     groupMap: groupMap,
  //   },
  // })

  //
  // Labs page
  //

  createPage({
    path: paths.labsPath,
    component: allLabsTemplate,
    context: {
      allLabs: allLabs,
      crumbs: [["Labs", paths.labsPath]],
    },
  })

  //
  // Pages for each lab
  //

  for (let lab of allLabs) {
    path = `${paths.labsPath}/${lab.id}`

    const faculty = peopleMap[lab.id]
    const labPublications = lab.id in personPubMap ? personPubMap[lab.id] : [] //lab.id in labPubMap ? labPubMap[lab.id] : []

    const labNews = allNews.filter((item) =>
      item.frontmatter.people.includes(lab.id)
    )

    let labHtml = ""
    let labExcerptHtml = ""

    if (path in markdownMap) {
      const markdown = markdownMap[path]
      labHtml = markdown.html
      labExcerptHtml = markdown.excerpt
    }

    createPage({
      path: path,
      component: labTemplate,
      context: {
        id: lab.id,
        lab: lab,
        crumbs: [
          ["Labs", paths.labsPath],
          [lab.name, path],
        ],
        faculty: faculty,
        labPublications: labPublications,
        labNews: labNews,
        labExcerptHtml: labExcerptHtml,
      },
    })

    const labPeoplePath = `${path}/people`
    createPage({
      path: labPeoplePath,
      component: labPeopleTemplate,
      context: {
        lab: lab,
        crumbs: [
          ["Labs", paths.labsPath],
          [lab.name, path],
          ["People", labPeoplePath],
        ],
        faculty: faculty,
      },
    })

    //
    // Lab publications
    //
    const pubPath = `${path}/publications`
    createPage({
      path: pubPath,
      component: publicationsTemplate,
      context: {
        title: `${lab.name} Publications`,
        crumbs: [
          ["Labs", paths.labsPath],
          [lab.name, path],
          ["Publications", pubPath],
        ],
        selectedTab: "",
        allPublications: labPublications,
        showSearch: false,
        showYears: true,
        showLabLink: false,
      },
    })
  }

  //
  // Publications
  //

  createPage({
    path: paths.publicationsPath,
    component: publicationsTemplate,
    context: {
      title: `Browse Our Publications`,
      crumbs: [["Publications", paths.publicationsPath]],
      selectedTab: "Publications",
      allPublications: allPublications,
      index: "/publications.index.json",
      showSearch: true,
      showYears: false,
      showLabLink: false,
    },
  })

  //
  // Admin
  //

  createPage({
    path: paths.adminPath,
    component: adminTemplate,
    context: {},
  })

  createPage({
    path: paths.adminStaffPath,
    component: adminStaffTemplate,
    context: {
      crumbs: [["Adminstration", paths.adminStaffPath]],
      admin: admin,
    },
  })

  //
  // News pages
  //

  createPage({
    path: paths.newsPath,
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
    path: paths.eventsPath,
    component: calEventsTemplate,
    context: {
      allCalEvents: allCalEvents,
      filterEventTypes: [],
    },
  })

  createPage({
    path: `${paths.eventsPath}/types/seminar`,
    component: calEventsTemplate,
    context: {
      allCalEvents: allCalEvents,
      filterEventTypes: ["Seminar"],
    },
  })

  createPage({
    path: `${paths.eventsPath}/types/public-talk`,
    component: calEventsTemplate,
    context: {
      allCalEvents: allCalEvents,
      filterEventTypes: ["Public Talk"],
    },
  })

  for (let calEvent of allCalEvents) {
    const path = `${paths.eventsPath}/${
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

  // about

  createPage({
    path: "/help",
    component: helpTemplate,
    context: {},
  })

  //
  // Indexing
  //

  // const siteData = {}

  // siteData.sections = searchData["sections"]
  // siteData.links = []
  // siteData.linkNames = []
  // siteData.tree = [{}, []]

  // const linkNameMap = {}

  // for (let section of siteData.sections) {
  //   if (section in searchData["data"]) {
  //     for (let s of Object.keys(searchData["data"][section]).sort()) {
  //       const link = searchData["data"][section][s]

  //       let si = -1

  //       for (let i = 0; i < siteData.sections.length; ++i) {
  //         if (siteData.sections[i] === section) {
  //           si = i
  //           break
  //         }
  //       }

  //       if (!(link["name"] in linkNameMap)) {
  //         linkNameMap[link["name"]] = siteData.linkNames.length
  //         siteData.linkNames.push(link["name"])
  //       }

  //       siteData.links.push([s, si, linkNameMap[link["name"]], link["to"]])
  //     }
  //   }
  // }

  // // Build a suffix tree
  // for (let i = 0; i < siteData.links.length; ++i) {
  //   createSuffixTree(siteData.tree, siteData.links[i][0], i)
  // }

  // const words = siteData.links[i][0].toLowerCase()

  // for (let j = 0; j < words.length; ++j) {
  //   const suffix = words.substring(j)

  //   let node = siteData.tree

  //   for (let k = 0; k < suffix.length; ++k) {
  //     const c = suffix.charAt(k)

  //     if (!(c in node[0])) {
  //       node[0][c] = [{}, []]
  //     }

  //     const nextNode = node[0][c]

  //     // Suffix must be at least of length two to
  //     // store results
  //     if (k > 0) {
  //       if (!nextNode[1].includes(i)) {
  //         nextNode[1].push(i)
  //       }
  //     }

  //     node = nextNode
  //   }
  // }

  //let data = JSON.stringify(siteData)
  //fs.writeFileSync("static/site.json", data)
}
