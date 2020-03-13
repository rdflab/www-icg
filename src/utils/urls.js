export const personUrl = person => {
  return `/research-areas/faculty-and-staff/${person.frontmatter.id}`
}

export const labUrl = group => {
  return `/research-areas/labs/${group.frontmatter.id}`
}

export const labMembersUrl = group => {
  return `/research-areas/labs/${group.frontmatter.id}/members`
}
