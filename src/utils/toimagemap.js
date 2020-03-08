const toImageMap = files => {
  let ret = {}

  files.edges.map(({ node }) => {
    ret[node.name] = node
  })

  return ret
}

export default toImageMap
