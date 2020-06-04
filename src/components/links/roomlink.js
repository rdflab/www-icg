import React from "react"
import IconLink from "./iconlink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const RoomLink = ({ room, color }) => (
  <IconLink
    icon={
      <FontAwesomeIcon icon="door-open" className={`text-${color} text-xl`} />
    }
    content={<div className={`text-${color}`}>Room {room}</div>}
  />
)

RoomLink.defaultProps = {
  color: "black",
}

export default RoomLink
