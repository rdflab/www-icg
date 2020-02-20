const toLab = (lab, peopleMap) => {
  const ret = {}
  ret.id = lab.id
  ret.name = lab.name
  ret.faculty = peopleMap.get(lab.faculty)

  return ret
}

export default toLab
