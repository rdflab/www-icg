import React, { useState } from "react"
import Img from "gatsby-image"

export const ZoomImage = ({ fluid, extZoom, className }) => {
  const [hover, setHover] = useState(false)

  const onMouseEnter = (e) => {
    setHover(true)
  }

  const onMouseLeave = (e) => {
    setHover(false)
  }

  const zoom = extZoom !== null ? extZoom : hover

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Img
        fluid={fluid}
        className={`trans-ani ${className}`}
        style={{ transform: zoom ? "scale(1.06)" : "scale(1.02)" }}
      />
    </div>
  )
}

ZoomImage.defaultProps = {
  className: "",
  extZoom: null,
}

export default ZoomImage
