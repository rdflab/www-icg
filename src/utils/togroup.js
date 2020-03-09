const toGroup = (group, peopleMap) => {
  const ret = {}
  ret.id = group.frontmatter.id
  ret.name = group.frontmatter.name
  ret.faculty = peopleMap.get(group.faculty)

  return ret
}

export default toGroup
