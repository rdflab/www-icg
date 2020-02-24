import { PEOPLE_TYPES } from "../constants"

const toPeopleTypeMap = people => {
  const ret = {}

  for (let type of PEOPLE_TYPES) {
    ret[type] = []
  }

  for (let person of people) {
    if (!(person.type in ret)) {
      ret[person.type] = []
    }

    ret[person.type].push(person)
  }

  return ret
}

export default toPeopleTypeMap
