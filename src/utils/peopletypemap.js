import { PEOPLE_TYPES } from "../constants"

const toPeopleTypeMap = people => {
  const ret = new Map()

  for (let type of PEOPLE_TYPES) {
    ret.set(type, [])
  }

  for (let person of people) {
    if (!ret.has(person.type)) {
      ret.set(person.type, [])
    }

    ret.get(person.type).push(person)
  }

  return ret
}

export default toPeopleTypeMap
