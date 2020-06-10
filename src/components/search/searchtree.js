import Stack from "../../utils/stack"

const EMPTY_TOKEN = ""

/**
 * Searches a suffix tree for matching strings
 * Supports boolean matching terms AND and OR
 * @param {} root
 * @param {*} q
 */
export const searchTree = (root, q) => {
  let node
  let found
  const text = q
    .replace(/ /g, " OR ")
    .replace(/( OR)+/g, " OR")
    .replace(/AND OR/g, "AND")
    .replace(/OR AND/g, "AND")

  const words = text.split(" ")

  const lastWord = words[words.length - 1]

  // Need empty token to balance parser
  if (lastWord === "AND" || lastWord === "OR") {
    words.push(EMPTY_TOKEN)
  }

  const outputStack = new Stack()
  const opStack = new Stack()

  for (let token of words) {
    switch (token) {
      case "AND":
        while (!opStack.isEmpty()) {
          if (opStack.peek() === "AND") {
            outputStack.push(opStack.pop())
          } else {
            break
          }
        }

        opStack.push(token)

        break
      case "OR":
        while (!opStack.isEmpty()) {
          outputStack.push(opStack.pop())
        }

        opStack.push(token)

        break
      default:
        outputStack.push(token)
    }
  }

  while (!opStack.isEmpty()) {
    outputStack.push(opStack.pop())
  }

  let terms = []
  let s1
  let s2

  for (let token of outputStack.values()) {
    switch (token) {
      case "AND":
        s2 = opStack.pop()
        s1 = opStack.pop()

        s1 = Array.from(s1).filter((e) => {
          return s2.has(e)
        })

        opStack.push(s1)

        break
      case "OR":
        s2 = opStack.pop()
        s1 = opStack.pop()

        s2.forEach((e) => {
          s1.add(e)
        })

        opStack.push(s1)

        break
      default:
        // Search
        if (token !== EMPTY_TOKEN) {
          const word = token.toLowerCase()

          const items = new Set()

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
              items.add(item)
            }
          }

          opStack.push(items)

          // Keep track of the actual words entered excluding
          // boolean terms
          terms.push(word)
        } else {
          opStack.push(new Set())
        }

        break
    }
  }

  // for (let word of words) {
  //   node = root

  //   found = true

  //   for (let i = 0; i < word.length; ++i) {
  //     const c = word.charAt(i)

  //     node = node[0][c]

  //     if (node === undefined) {
  //       found = false
  //       break
  //     }
  //   }

  //   if (found) {
  //     for (let item of node[1]) {
  //       ret.add(item)
  //     }
  //   }
  // }

  const ret = Array.from(opStack.pop()).sort()

  return [ret, terms]
}
