const getContextName = (context, contextMap) => {
  let ret = ""

  if (context in contextMap) {
    ret = contextMap[context]
  } else {
    // Look for default value
    if ("default" in contextMap) {
      ret = contextMap["default"]
    }
  }

  return ret
}

export default getContextName
