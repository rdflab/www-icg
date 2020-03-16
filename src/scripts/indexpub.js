"use strict"
const fs = require("fs")
import { createSuffixTree } from "./suffixtree"

//
// Index publications
//

let data = JSON.parse(fs.readFileSync("src/data/publications.json"))

let pubIndex = [{}, []]

for (let i = 0; i < data.length; ++i) {
  const publication = data[i]

  createSuffixTree(pubIndex, publication.title, i)
  createSuffixTree(pubIndex, publication.year.toString(), i)
}

fs.writeFileSync("static/publications.index.json", JSON.stringify(pubIndex))
