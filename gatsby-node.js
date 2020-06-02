const path = require(`path`)
var fs = require("fs")

const GROUPS = [
  "Faculty",
  "Divisional Administrator",
  "Administrative Staff",
  "Research Staff",
  "Graduate Student",
  "Undergraduates",
  "Staff",
]

const indexTemplate = path.resolve(`src/templates/indextemplate.js`)
const labTemplate = path.resolve(`src/templates/labtemplate.js`)
const labPeopleTemplate = path.resolve(`src/templates/labpeopletemplate.js`)
const labsTemplate = path.resolve(`src/templates/labstemplate.js`)
const facultyTemplate = path.resolve(`src/templates/facultytemplate.js`)
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

const toPeopleMap = people => {
  let ret = {}

  people.forEach(person => {
    //ret.set(person.id, person)
    ret[person.frontmatter.id] = person
  })

  return ret
}

const toGroupMap = people => {
  const ret = {}

  for (let person of people) {
    const g = person.frontmatter.group

    if (!(g in ret)) {
      ret[g] = []
    }

    ret[g].push(person)
  }

  return ret
}

const createSuffixTree = (root, text, item) => {
  const words = text.toLowerCase().split(" ")

  for (let word of words) {
    for (let j = 0; j < word.length; ++j) {
      let node = root

      const suffix = word.substring(j)

      for (let k = 0; k < suffix.length; k++) {
        const c = suffix.charAt(k)

        if (!(c in node[0])) {
          node[0][c] = [{}, []]
        }

        node = node[0][c]

        if (k > 0) {
          if (!node[1].includes(item)) {
            node[1].push(item)
          }
        }
      }
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type LabsJson implements Node {
      url: [String!]!
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
      name: String!
      firstName: String!
      lastName: String!
      title: String!
      postNominalLetters: String!
      tags: [String!]!
      room: String!
      type: String!
      url: [String!]!
      labs: [String!]!
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

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
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
              name
              firstName
              lastName
              title
              postNominalLetters
              email
              phone
              fax
              room
              group
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
            url
            faculty {
              id
              labId
            }
          }
        }
      }

      labs: allLabsJson {
        edges {
          node {
            id
            name
            url
            people
          }
        }
      }

      admin: allAdministrationJson {
        edges {
          node {
            id
            name
            url
            people
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
            labs
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
              labs
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
  const facultyStaff = []
  result.data.people.edges.forEach(({ node }) => {
    const person = node
    allPeople.push(person)

    if (
      person.frontmatter.group === "Faculty" ||
      person.frontmatter.group === "Research Staff"
    ) {
      facultyStaff.push(person)
    }
  })

  const peopleMap = toPeopleMap(allPeople)
  const groupMap = toGroupMap(allPeople)

  const allResearchAreas = []
  const researchAreasMap = {}
  result.data.researchAreas.edges.forEach(({ node }) => {
    allResearchAreas.push(node)
    researchAreasMap[node.id] = node
  })

  const cvMap = {}
  result.data.cv.edges.forEach(({ node }) => {
    cvMap[node.id] = node
  })

  const allLabs = []
  const labMap = {}
  result.data.labs.edges.forEach(({ node }) => {
    const lab = node
    allLabs.push(lab)
    labMap[lab.id] = lab
  })

  const allFaculty = []
  result.data.faculty.edges.forEach(({ node }) => {
    const faculty = node
    allFaculty.push(faculty)
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

  const admin = allAdmin[0]
  const adminPeople = admin.people.map(pid => peopleMap[pid])
  const adminGroupMap = toGroupMap(adminPeople)

  // result.data.labGroups.edges.forEach(({ node }) => {
  //   const group = node

  //   const leaders = []

  //   for (let person of group.frontmatter.leaders) {
  //     leaders.push(peopleMap[person])
  //   }

  //   group.leaders = leaders

  //   const members = []

  //   for (let person of group.frontmatter.members) {
  //     members.push(peopleMap[person])
  //   }

  //   group.members = members

  //   allLabGroups.push(group)
  // })

  //
  // Work out if people belong to more than one group
  //
  const personGroups = {}

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
  const labPubMap = {}

  result.data.publications.edges.forEach(({ node }) => {
    const publication = node

    // replace labs refs with labs objs

    for (let labId of publication.labs) {
      if (labId in labMap) {
        if (!(labId in labPubMap)) {
          labPubMap[labId] = []
        }

        labPubMap[labId].push(publication)
      }
    }

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
  // Index some data for searching
  //

  // const searchData = {}
  // searchData["sections"] = []
  // searchData["data"] = {}

  // // Labs

  // searchData["sections"].push("Labs")
  // searchData["data"]["Labs"] = {}

  // for (let lab of allLabs) {
  //   searchData["data"]["Labs"][lab.name] = {
  //     name: "Lab page",
  //     to: `/research-areas/labs/${lab.id}`,
  //   }
  // }

  // // Research areas

  // searchData["sections"].push("Research Areas")
  // searchData["data"]["Research Areas"] = {}

  // for (let ra of allResearchAreas) {
  //   searchData["data"]["Research Areas"][ra.name] = {
  //     name: "Research page",
  //     to: `/research-areas/${ra.id}`,
  //   }
  // }

  // People types

  // const peopleTypeMap = toPeopleTypeMap(allPeople)

  // for (let type of PEOPLE_TYPES) {
  //   searchData["sections"].push(type)
  //   searchData["data"][type] = {}

  //   for (let person of peopleTypeMap[type]) {
  //     const name = `${person.frontmatter.firstName} ${person.frontmatter.lastName}`

  //     //const groupId = `${person.frontmatter.id}-lab`
  //     // if (groupId in groupMap) {
  //     //   searchData["data"][type][name].push({
  //     //     name: "Lab",
  //     //     to: `/research-areas/labs/${groupId}`,
  //     //   })
  //     // }

  //     searchData["data"][type][name] = {
  //       name: `${person.frontmatter.title}`,
  //       to: `/people/${person.frontmatter.id}`,
  //     }
  //   }
  // }

  // Publications

  // searchData["sections"].push("Publications")
  // searchData["data"]["Publications"] = {}

  // for (let i = 0; i < allPublications.length; ++i) {
  //   const publication = allPublications[i]

  //   if (publication.pubmed !== "") {
  //     let title = publication.title

  //     // Truncate if longer than 50 chars
  //     if (title.length > 60) {
  //       title = `${title.substring(0, 60)}...`
  //     }

  //     searchData["data"]["Publications"][title] = {
  //       name: `PubMed`,
  //       to: `https://www.ncbi.nlm.nih.gov/pubmed/?term=${publication.pubmed}`,
  //     }
  //   }
  // }

  // // News

  // searchData["sections"].push("News")
  // searchData["data"]["News"] = {}

  // for (let item of allNews) {
  //   searchData["data"]["News"][item.frontmatter.title] = {
  //     name: `View`,
  //     to: item.frontmatter.path,
  //   }
  // }

  // // Events

  // searchData["sections"].push("Events")
  // searchData["data"]["Events"] = {}

  // for (let calEvent of allCalEvents) {
  //   const path = `/events/${
  //     calEvent.frontmatter.start.split("T")[0]
  //   }-${calEvent.frontmatter.title.toLowerCase().replace(" ", "-")}`

  //   searchData["data"]["Events"][calEvent.frontmatter.title] = {
  //     name: `View`,
  //     to: path,
  //   }
  // }

  //
  // Make pages
  //

  const RESEARCH_AREAS_PATH = "/research-areas"
  const LABS_PATH = `${RESEARCH_AREAS_PATH}/labs`
  const FACULTY_PATH = `${RESEARCH_AREAS_PATH}/faculty`
  const FACULTY_STAFF_PATH = `${RESEARCH_AREAS_PATH}/faculty-staff`
  const PUBLICATIONS_PATH = `${RESEARCH_AREAS_PATH}/publications`
  const ADMIN_PATH = "/administration"
  const ADMIN_STAFF_PATH = `${ADMIN_PATH}/staff`
  const PEOPLE_PATH = `people`

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

  for (let person of allPeople) {
    const pid = person.frontmatter.id

    createPage({
      path: `/people/${pid}`,
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
    path: RESEARCH_AREAS_PATH,
    component: researchAreasTemplate,
    context: {
      allResearchAreas: allResearchAreas,
    },
  })

  // for (let researchArea of allResearchAreas) {
  //   createPage({
  //     path: `/research-areas/${researchArea.id}`,
  //     component: researchAreaTemplate,
  //     context: {
  //       allPeople: allPeople,
  //       peopleMap: peopleMap,
  //       researchArea: researchArea,
  //     },
  //   })
  // }

  //
  // Faculty
  //

  createPage({
    path: FACULTY_PATH,
    component: facultyTemplate,
    context: {
      title: "Faculty",
      crumbs: [
        ["Research Areas", RESEARCH_AREAS_PATH],
        ["Faculty", FACULTY_PATH],
      ],
      allGroups: allFaculty,
      peopleMap: peopleMap,
    },
  })

  createPage({
    path: FACULTY_STAFF_PATH,
    component: peopleTemplate,
    context: {
      crumbs: [
        ["Research Areas", RESEARCH_AREAS_PATH],
        ["Faculty & Staff", FACULTY_STAFF_PATH],
      ],
      nav: "For Research Scientists",
      title: "Meet Our Faculty & Staff",
      allPeople: facultyStaff,
      groupMap: groupMap,
    },
  })

  //
  // Labs page
  //

  createPage({
    path: LABS_PATH,
    component: labsTemplate,
    context: {
      allLabs: allLabs,
      crumbs: [
        ["Research Areas", RESEARCH_AREAS_PATH],
        ["Labs", LABS_PATH],
      ],
    },
  })

  //
  // Pages for each lab
  //

  for (let lab of allLabs) {
    path = `${LABS_PATH}/${lab.id}`

    const faculty = peopleMap[lab.id]
    const labPublications = lab.id in labPubMap ? labPubMap[lab.id] : []

    const labPeople = lab.people.map(pid => peopleMap[pid])
    const labGroupMap = toGroupMap(labPeople)

    const labNews = allNews.filter(item =>
      item.frontmatter.labs.includes(lab.id)
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
        lab: lab,
        crumbs: [
          ["Research Areas", RESEARCH_AREAS_PATH],
          ["Labs", LABS_PATH],
          [lab.name, path],
        ],
        faculty: faculty,
        labGroupMap: labGroupMap,
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
          ["Research Areas", RESEARCH_AREAS_PATH],
          ["Labs", LABS_PATH],
          [lab.name, path],
          ["People", labPeoplePath],
        ],
        faculty: faculty,
        labGroupMap: labGroupMap,
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
          ["Research Areas", RESEARCH_AREAS_PATH],
          ["Labs", LABS_PATH],
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
    path: PUBLICATIONS_PATH,
    component: publicationsTemplate,
    context: {
      title: `Browse Our Publications`,
      crumbs: [
        ["Research Ares", RESEARCH_AREAS_PATH],
        ["Publications", PUBLICATIONS_PATH],
      ],
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
    path: ADMIN_PATH,
    component: adminTemplate,
    context: {},
  })

  createPage({
    path: ADMIN_STAFF_PATH,
    component: adminStaffTemplate,
    context: {
      crumbs: [
        ["Adminstration", ADMIN_PATH],
        ["Staff", ADMIN_STAFF_PATH],
      ],
      adminGroupMap: adminGroupMap,
    },
  })

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

  //
  // People
  //

  createPage({
    path: PEOPLE_PATH,
    component: peopleTemplate,
    context: {
      crumbs: [["People", PEOPLE_PATH]],
      nav: "People",
      title: "Browse Our People",
      allPeople: allPeople,
      groupMap: groupMap,
    },
  })

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
