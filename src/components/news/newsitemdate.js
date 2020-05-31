import React from "react"

const formatDate = date => {
  return `${date.toLocaleString("default", {
    month: "short",
  })} ${date.toLocaleString("default", {
    day: "numeric",
  })}, ${date.toLocaleString("default", { year: "numeric" })}`
}

const NewsItemDate = ({ item }) => <h4>{formatDate(item.date)}</h4>

export default NewsItemDate
