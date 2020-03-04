import React from "react"

const NewsContent = ({ html }) => (
  <div className="mt-2" dangerouslySetInnerHTML={{ __html: html }} />
)

export default NewsContent
