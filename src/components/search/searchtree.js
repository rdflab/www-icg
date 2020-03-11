export const searchTree = (root, q) => {
  //console.log("q", q)

  let node
  let found
  const words = q.toLowerCase().split(" ")

  let ret = new Set()

  for (let word of words) {
    node = root

    found = true

    for (let i = 0; i < word.length; ++i) {
      const c = word.charAt(i)

      node = node[0][c]

      if (node === undefined) {
        found = false
        break
      }
    }

    if (found) {
      for (let item of node[1]) {
        ret.add(item)
      }
    }
  }

  return [Array.from(ret).sort(), words]
}
