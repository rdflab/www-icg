import React from "react"

// const formatDate = date => {
//   if (date === undefined) {
//     return ""
//   }

//   return `${date.toLocaleString("default", {
//     month: "short",
//   })} ${date.toLocaleString("default", {
//     day: "numeric",
//   })}, ${date.toLocaleString("default", { year: "numeric" })}`
// }

const NewsItemDate = ({ item }) => <h5>{item.frontmatter.date}</h5>

export default NewsItemDate
