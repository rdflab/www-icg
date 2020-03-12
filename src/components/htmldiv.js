import React from "react"

/**
 * Show HTML inside a div
 *
 * @param {*} param0
 */
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
