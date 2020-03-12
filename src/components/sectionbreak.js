import React from "react"

const SectionBreak = ({ children, className }) => (
  <div
    className={`mt-4 pt-2 border-t border-solid border-gray-300 ${className}`}
  >
    {children}
  </div>
)

SectionBreak.defaultProps = {
  className: "",
}

export default SectionBreak
