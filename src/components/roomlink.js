import React from "react"
import { FaDoorOpen } from "react-icons/fa"
import IconLink from "./iconlink"
import BlueLinkExt from "./bluelinkext"

const RoomLink = ({ room }) => (
  <IconLink
    icon={<FaDoorOpen className="text-white" size={20} />}
    content={<div className="text-white">Room {room}</div>}
  />
)

export default RoomLink
