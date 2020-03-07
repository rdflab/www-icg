import toGroup from "./togroup"

const toGroups = (groups, peopleMap) => {
  let ret = []

  for (let lab of groups) {
    ret.push(toGroup(lab, peopleMap))
  }

  return ret
}

export default toGroups
