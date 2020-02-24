const toPeopleMap = people => {
  let ret = {}

  people.forEach(person => {
    ret[person.id] = person
  })

  return ret
}

export default toPeopleMap
