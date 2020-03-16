"use strict"
const fs = require("fs")
var readMarkdown = require("read-markdown")

const createSuffixTree = (root, text, item) => {
  const words = text.toLowerCase().split(" ")

  for (let word of words) {
    for (let j = 0; j < word.length; ++j) {
      let node = root

      const suffix = word.substring(j)

      for (let k = 0; k < suffix.length; k++) {
        const c = suffix.charAt(k)

        if (!(c in node[0])) {
          node[0][c] = [{}, []]
        }

        node = node[0][c]

        if (k > 0) {
          if (!node[1].includes(item)) {
            node[1].push(item)
          }
        }
      }
    }
  }
}

//
// Index publications
//

readMarkdown("src/data/groups/*.md").then(function(data) {
  console.log(data)
})

let data = JSON.parse(fs.readFileSync("src/data/publications.json"))

let pubIndex = [{}, []]

for (let i = 0; i < data.length; ++i) {
  const publication = data[i]

  createSuffixTree(pubIndex, publication.title, i)
  createSuffixTree(pubIndex, publication.year.toString(), i)
}

fs.writeFileSync("static/site.index.json", JSON.stringify(pubIndex))
