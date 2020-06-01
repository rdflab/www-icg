import React, { useState } from "react"
import AnimateHeight from "react-animate-height"
import { FaChevronUp, FaChevronDown } from "react-icons/fa"
import Column from "./column"

const Collapsible = ({ title, height, children, headerClassName }) => {
  const [_height, setHeight] = useState(height)

  const toggle = () => {
    setHeight(_height === 0 ? "auto" : 0)
  }

  return (
    <div className="w-full">
      <Column
        isMobile={true}
        className={`items-center mb-2 cursor-pointer w-full justify-between`}
        onClick={toggle}
        aria-label={`Collapse ${title}`}
      >
        <h4 className={`${headerClassName}`}>{title}</h4>
        <div className="text-gray-500 hover:text-gray-800 trans-ani">
          {_height === 0 ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </Column>

      <AnimateHeight duration={250} height={_height}>
        {children}
      </AnimateHeight>
    </div>
  )
}

Collapsible.defaultProps = {
  headerClassName: "",
}

export default Collapsible
