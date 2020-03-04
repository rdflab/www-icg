import React from "react"

const HTMLDiv = ({ html, className }) => (
  <div
    className={`mt-2 ${className}`}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

HTMLDiv.defaultProps = {
  className: "",
}

export default HTMLDiv
