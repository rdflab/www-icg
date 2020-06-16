const getEventTypeUrl = (root, eventType) => {
  return `${root}/types/${eventType.replace(" ", "-").toLowerCase()}`
}

export default getEventTypeUrl
