const toGroup = (group, peopleMap) => {
  const ret = {}
  ret.id = group.id
  ret.name = group.name
  ret.faculty = peopleMap.get(group.faculty)

  return ret
}

export default toGroup
