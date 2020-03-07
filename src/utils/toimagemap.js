// const toLabMap = peopleMap => {
//   let ret = new Map()

//   for (let id of peopleMap.keys()) {
//     const person = peopleMap.get(id)

//     if (person.tags.includes("faculty")) {
//       for (let labId of person.labs) {
//         if (!ret.has(labId) && person.id === labId) {
//           const lab = new Object()
//           lab.labId = labId
//           lab.faculty = person
//           ret.set(labId, lab)
//         }
//       }
//     }
//   }

//   return ret
// }

const toImageMap = files => {
  let ret = {}

  files.edges.map(({ node }) => {
    ret[node.name] = node
  })

  return ret
}

export default toImageMap
