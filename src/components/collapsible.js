import React, { useState } from "react"
import AnimateHeight from "react-animate-height"
import { FaChevronUp, FaChevronDown } from "react-icons/fa"

const Collapsible = ({ title, height, children, headerClassName }) => {
  const [_height, setHeight] = useState(height)

  const toggle = () => {
    setHeight(_height === 0 ? "auto" : 0)
  }

  return (
    <>
      <div
        className={`row items-center mb-2 cursor-pointer`}
        onClick={toggle}
        aria-label={`Collapse ${title}`}
      >
        <h2 className={`${headerClassName}`}>{title}</h2>
        <div className="ml-auto text-gray-500 hover:text-gray-800 trans-ani">
          {height === 0 ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>

      <AnimateHeight duration={250} height={_height}>
        {children}
      </AnimateHeight>
    </>
  )
}

Collapsible.defaultProps = {
  headerClassName: "",
}

export default Collapsible
