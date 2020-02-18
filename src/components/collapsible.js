import React, {useState} from "react"
import AnimateHeight from 'react-animate-height';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import collapsibleStyles from "./collapsible.module.scss"

const Collapsible = (props) => {
  const [height, setHeight] = useState(props.height)
  
  const toggle = () => {
    setHeight(height === 0 ? 'auto' : 0)
  }

  return (
    <div className={collapsibleStyles.collapsible}>
      <button className={collapsibleStyles.collapsibleButton} onClick={toggle}>
          <div style={{float: "left"}}>
            { props.title }
          </div>
          <div style={{float: "right"}}>
            {height === 0 ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
          </div>
      </button>

      <AnimateHeight duration={250} height={height}>
          {props.children}
      </AnimateHeight>
    </div>
  );
}

export default Collapsible