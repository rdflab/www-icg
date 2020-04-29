import React from "react"
import { FaDoorOpen } from "react-icons/fa"
import IconLink from "./iconlink"

const RoomLink = ({ room, color }) => (
  <IconLink
    icon={<FaDoorOpen className={`text-${color}`} size={20} />}
    content={<div className={`text-${color}`}>Room {room}</div>}
  />
)

RoomLink.defaultProps = {
  color: "black",
}

export default RoomLink
