import React from "react"
import Column from "./column"

const IconLink = ({ icon, content }) => (
  <div className="row my-1">
    <div className="mr-4">{icon}</div>

    <div>{content}</div>
  </div>
)

export default IconLink
