import React from "react"
import MainSectionBreak from "./mainsectionbreak"
import AltSectionBreak from "./altsectionbreak"

const SectionBreak = ({ title, children, mode, align, className }) => {
  switch (mode) {
    case "alt":
      return (
        <AltSectionBreak title={title} className={className}>
          {children}
        </AltSectionBreak>
      )
    default:
      return (
        <MainSectionBreak title={title} className={className} align={align}>
          {children}
        </MainSectionBreak>
      )
  }
}

SectionBreak.defaultProps = {
  mode: "main",
  align: "text-left",
  title: "",
  className: "",
}

export default SectionBreak
