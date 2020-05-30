import React from "react"

/**
 * Show HTML inside a div
 *
 * @param {*} param0
 */
const HTMLDiv = ({ html, className }) => (
  <div className={`${className}`} dangerouslySetInnerHTML={{ __html: html }} />
)

HTMLDiv.defaultProps = {
  className: "",
}

export default HTMLDiv
