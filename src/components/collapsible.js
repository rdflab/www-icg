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
      <div className="level" onClick={toggle}>
        <div className="level-left">
          <div className="level-item">
            <h5 className="title is-5">{props.title}</h5>
          </div>
        </div>
        <div className="level-right">
          <div>{height === 0 ? <FaChevronDown /> : <FaChevronUp />}</div>
        </div>
      </div>

      <AnimateHeight duration={250} height={height}>
        {props.children}
      </AnimateHeight>
    </div>
  )
}

export default Collapsible
