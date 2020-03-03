import React, { useState } from "react"
import AnimateHeight from "react-animate-height"
import { FaChevronUp, FaChevronDown } from "react-icons/fa"

const Collapsible = props => {
  const [height, setHeight] = useState(props.height)

  const toggle = () => {
    setHeight(height === 0 ? "auto" : 0)
  }

  return (
    <div className="my-4">
      <div
        className="row items-center mb-2 cursor-pointer text-gray-700"
        onClick={toggle}
      >
        <h1 className="text-lg">{props.title}</h1>
        <div className="ml-auto">
          {height === 0 ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>

      <AnimateHeight duration={250} height={height}>
        {props.children}
      </AnimateHeight>
    </div>
  )
}

export default Collapsible
