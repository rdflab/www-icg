export const personUrl = person => {
  return `/people/${person.frontmatter.id}`
}

export const labUrl = group => {
  return `/research-areas/labs/${group.frontmatter.id}`
}

export const labMembersUrl = group => {
  return `/research-areas/labs/${group.frontmatter.id}/members`
}

export const eventUrl = event => {
  return `/events/${
    event.frontmatter.start.split("T")[0]
  }-${event.frontmatter.title.toLowerCase().replace(" ", "-")}`
}
