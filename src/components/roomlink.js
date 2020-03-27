import React from "react"
import { FaDoorOpen } from "react-icons/fa"
import IconLink from "./iconlink"
import BlueLinkExt from "./bluelinkext"

const RoomLink = ({ room }) => (
  <IconLink
    icon={<FaDoorOpen className="text-gray-600" size={20} />}
    content={<div className="gray">Room {room}</div>}
  />
)

export default RoomLink
