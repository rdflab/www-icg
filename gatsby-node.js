const path = require(`path`)
var fs = require("fs")

const PEOPLE_TYPES = [
  "Faculty",
  "Research Scientist",
  "Graduate Student",
  "Staff",
]

const labTemplate = path.resolve(`src/templates/labtemplate.js`)
const labsTemplate = path.resolve(`src/templates/labstemplate.js`)
const peopleTemplate = path.resolve(`src/templates/peopletemplate.js`)
const labOverviewTemplate = path.resolve(`src/templates/laboverviewtemplate.js`)
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

// const writeJson = (file, data) => {
//   fs.writeFileSync(file, JSON.stringify(data))
// }

// const indexPublications = publications => {
//   pubIndex = [{}, []]

//   for (let i = 0; i < publications.length; ++i) {
//     const publication = publications[i]

//     createSuffixTree(pubIndex, publication.title, i)
//   }

//   return pubIndex
// }

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
        filter: { fileAbsolutePath: { regex: "/people/" } }
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
        filter: { fileAbsolutePath: { regex: "/events/" } }
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
  const cvMap = {}

  result.data.researchAreas.edges.forEach(({ node }) => {
    allResearchAreas.push(node)
    researchAreasMap[node.id] = node
  })

  result.data.cv.edges.forEach(({ node }) => {
    cvMap[node.id] = node
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

  result.data.labGroups.edges.forEach(({ node }) => {
    const group = node

    const leaders = []

    for (let person of group.frontmatter.leaders) {
      leaders.push(peopleMap[person])
    }

    group.leaders = leaders

    const members = []

    for (let person of group.frontmatter.members) {
      members.push(peopleMap[person])
    }

    group.members = members

    allLabGroups.push(group)
  })

  const groupMap = toGroupMap(allLabGroups)

  //
  // Work out if people belong to more than one group
  //
  const personGroups = {}

  for (let group of allLabGroups) {
    for (let person of group.leaders) {
      if (!(person.frontmatter.id in personGroups)) {
        personGroups[person.frontmatter.id] = new Set()
      }

      personGroups[person.frontmatter.id].add(group.frontmatter.id)
    }

    for (let person of group.members) {
      if (!(person.frontmatter.id in personGroups)) {
        personGroups[person.frontmatter.id] = new Set()
      }

      personGroups[person.frontmatter.id].add(group.frontmatter.id)
    }
  }

  // Add groups to person
  // for (let person of allPeople) {
  //   if (person.frontmatter.id in personGroups) {
  //     person.groups = personGroups[person.frontmatter.id]
  //   } else {
  //     person.groups = []
  //   }
  // }

  result.data.publications.edges.forEach(({ node }) => {
    const publication = node

    // replace labs refs with labs objs

    var groups = []

    for (let group of publication.groups) {
      if (group in groupMap) {
        groups.push(groupMap[group])
      }
    }

    publication.groups = groups

    var people = []

    for (let person of publication.people) {
      if (person in peopleMap) {
        people.push(peopleMap[person])
      }
    }

    publication.people = people

    allPublications.push(publication)
  })

  result.data.news.edges.forEach(({ node }) => {
    const item = node

    // better if the year is an int
    item.year = parseInt(item.frontmatter.year)

    allNews.push(item)
  })

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

  // Publications

  searchData["sections"].push("Publications")
  searchData["data"]["Publications"] = {}

  for (let i = 0; i < allPublications.length; ++i) {
    const publication = allPublications[i]

    if (publication.pubmed !== "") {
      let title = publication.title

      // Truncate if longer than 50 chars
      if (title.length > 60) {
        title = `${title.substring(0, 60)}...`
      }

      searchData["data"]["Publications"][title] = {
        name: `PubMed`,
        to: `https://www.ncbi.nlm.nih.gov/pubmed/?term=${publication.pubmed}`,
      }
    }
  }

  // News

  searchData["sections"].push("News")
  searchData["data"]["News"] = {}

  for (let item of allNews) {
    searchData["data"]["News"][item.frontmatter.title] = {
      name: `View`,
      to: item.frontmatter.path,
    }
  }

  // Events

  searchData["sections"].push("Events")
  searchData["data"]["Events"] = {}

  for (let calEvent of allCalEvents) {
    const path = `/events/${
      calEvent.frontmatter.start.split("T")[0]
    }-${calEvent.frontmatter.title.toLowerCase().replace(" ", "-")}`

    searchData["data"]["Events"][calEvent.frontmatter.title] = {
      name: `View`,
      to: path,
    }
  }

  //
  // Make pages
  //

  for (let group of allLabGroups) {
    const path = `/research-areas/labs/${group.frontmatter.id}`

    const labPublications = []

    // Filter for pubs belonging only to this lab/group
    for (let publication of allPublications) {
      for (let g of publication.groups) {
        if (g.frontmatter.id === group.frontmatter.id) {
          labPublications.push(publication)
          break
        }
      }
    }

    //labPubIndex = indexPublications(labPublications)
    //indexFile = `static/${group.frontmatter.id}.publications.index.json`
    //writeJson(indexFile, labPubIndex)

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
        labPeople: labPeople,
        labPublications: labPublications,
        labNews: labNews,
        labExcerptHtml: labExcerptHtml,
        labHtml: labHtml,
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
        labPublications: labPublications,
        labHtml: labHtml,
      },
    })

    //
    // Members
    //

    createPage({
      path: `${path}/members`,
      component: peopleTemplate,
      context: {
        title: `The ${group.frontmatter.name} Lab Members`,
        crumbs: [
          ["Home", "/"],
          ["Research Areas", "/research-areas"],
          ["Labs", "/research-areas/labs"],
          [
            group.frontmatter.name,
            `/research-areas/labs/${group.frontmatter.id}`,
          ],
          ["Members", `/research-areas/labs/${group.frontmatter.id}/members`],
        ],
        groupMap: groupMap,
        allPeople: labPeople,
      },
    })

    //
    // Lab publications
    //

    createPage({
      path: `${path}/publications`,
      component: publicationsTemplate,
      context: {
        title: `${group.frontmatter.name} Lab Publications`,
        crumbs: [
          ["Home", "/"],
          ["Research Areas", "/research-areas"],
          ["Labs", "/research-areas/labs"],
          [
            group.frontmatter.name,
            `/research-areas/labs/${group.frontmatter.id}`,
          ],
          [
            "Publications",
            `/research-areas/labs/${group.frontmatter.id}/publications`,
          ],
        ],
        selectedTab: "",
        allPublications: labPublications,
        showSearch: false,
        showYears: true,
        showLabLink: false,
      },
    })

    //
    // For each person
    //

    for (let pid of group.frontmatter.members) {
      const person = peopleMap[pid]

      const personPublications = []

      for (let publication of allPublications) {
        for (let p of publication.people) {
          if (p.frontmatter.id === person.frontmatter.id) {
            personPublications.push(publication)
            break
          }
        }
      }

      // Groups are not added to persons, because react
      // does not seem to like circular references, so
      // whilst groups contain people objects, people
      // cannot contain group objects at the same time
      let groups = []

      if (person.frontmatter.id in personGroups) {
        for (let id of personGroups[person.frontmatter.id]) {
          groups.push(groupMap[id])
        }
      }

      createPage({
        path: `/research-areas/faculty-and-staff/${person.frontmatter.id}`,
        component: personTemplate,
        context: {
          id: person.frontmatter.id,
          person: person,
          groups: groups,
          labPeople: labPeople,
          publications: personPublications,
          cv:
            person.frontmatter.id in cvMap
              ? cvMap[person.frontmatter.id]
              : null,
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
    },
  })

  // Faculty and Staff page

  createPage({
    path: "/research-areas/faculty-and-staff",
    component: peopleTemplate,
    context: {
      crumbs: [
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
      ],
      title: "Faculty and Staff",
      groupMap: groupMap,
      allPeople: allPeople,
    },
  })

  // Pubs page

  createPage({
    path: "/research-areas/publications",
    component: publicationsTemplate,
    context: {
      title: "Publications",
      crumbs: [
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Publications", "/research-areas/publications"],
      ],
      selectedTab: "Publications",
      allPublications: allPublications,
      index: "/publications.index.json",
      showSearch: true,
      showYears: true,
      showLabLink: false,
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
      },
    })
  }

  const siteData = {}

  siteData.sections = searchData["sections"]
  siteData.links = []
  siteData.linkNames = []
  siteData.tree = [{}, []]

  const linkNameMap = {}

  for (let section of siteData.sections) {
    if (section in searchData["data"]) {
      for (let s of Object.keys(searchData["data"][section]).sort()) {
        const link = searchData["data"][section][s]

        let si = -1

        for (let i = 0; i < siteData.sections.length; ++i) {
          if (siteData.sections[i] === section) {
            si = i
            break
          }
        }

        if (!(link["name"] in linkNameMap)) {
          linkNameMap[link["name"]] = siteData.linkNames.length
          siteData.linkNames.push(link["name"])
        }

        siteData.links.push([s, si, linkNameMap[link["name"]], link["to"]])
      }
    }
  }

  // Build a suffix tree
  for (let i = 0; i < siteData.links.length; ++i) {
    createSuffixTree(siteData.tree, siteData.links[i][0], i)
  }

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
