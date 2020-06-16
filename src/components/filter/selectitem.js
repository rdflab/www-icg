/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"

const SelectItem = ({
  text,
  className,
  selectedClassName,
  selected,
  onClick,
  children,
}) => {
  const _handleClick = (e) => {
    const data = { text: text, selected: true }
    onClick(data)
  }

  return (
    <div
      className={`${className} ${selected ? selectedClassName : ""}`}
      onClick={_handleClick}
    >
      {children}
    </div>
  )
}

SelectItem.defaultProps = {
  selected: false,
}

export default SelectItem
