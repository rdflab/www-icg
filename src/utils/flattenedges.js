const flattenEdges = edges => {
  let ret = []

  edges.forEach(({ node }) => {
    ret.push(node)
  })

  return ret
}

export default flattenEdges
