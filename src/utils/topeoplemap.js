const toPeopleMap = people => {
  let ret = {}

  people.forEach(person => {
    ret[person.frontmatter.id] = person
  })

  return ret
}

export default toPeopleMap
