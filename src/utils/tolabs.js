import toLab from "./tolab"

const toLabs = (labs, peopleMap) => {
  let ret = []

  for (let lab of labs) {
    ret.push(toLab(lab, peopleMap))
  }

  return ret
}

export default toLabs
