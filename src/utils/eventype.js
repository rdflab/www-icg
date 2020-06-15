const getEventType = (event) => {
  let ret = ""

  if (event.frontmatter.tags.includes("Public Talk")) {
    ret = "Public Talk"
  } else {
    ret = "Seminar"
  }

  return ret
}

export default getEventType
