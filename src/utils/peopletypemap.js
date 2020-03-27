import { PEOPLE_TYPES } from "../constants"

const toPeopleTypeMap = people => {
  const ret = {}

  for (let type of PEOPLE_TYPES) {
    ret[type] = []
  }

  for (let person of people) {
    const t = person.frontmatter.type

    if (!(t in ret)) {
      ret[t] = []
    }

    ret[t].push(person)
  }

  return ret
}

export default toPeopleTypeMap
