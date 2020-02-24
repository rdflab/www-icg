import React, { useState } from "react"
import AnimateHeight from "react-animate-height"
import collapsibleStyles from "./collapsible.module.scss"
import { FaChevronUp, FaChevronDown } from "react-icons/fa"

const Collapsible = props => {
  const [height, setHeight] = useState(props.height)

  const toggle = () => {
    setHeight(height === 0 ? "auto" : 0)
  }

  return (
    <div className={collapsibleStyles.collapsible}>
      <button className={collapsibleStyles.collapsibleButton} onClick={toggle}>
        <div style={{ float: "left" }}>{props.title}</div>
        <div style={{ float: "right" }}>
          {height === 0 ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </button>

      <AnimateHeight duration={250} height={height}>
        {props.children}
      </AnimateHeight>
    </div>
  )
}

export default Collapsible
