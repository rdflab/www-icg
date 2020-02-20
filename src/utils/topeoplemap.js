const toPeopleMap = people => {
  let ret = new Map()

  people.forEach(person => {
    ret.set(person.id, person)
  })

  return ret
}

export default toPeopleMap
