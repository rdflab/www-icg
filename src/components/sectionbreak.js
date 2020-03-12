import React from "react"
import MainSectionBreak from "./mainsectionbreak"
import AltSectionBreak from "./altsectionbreak"

const SectionBreak = ({ title, children, mode, className }) => {
  switch (mode) {
    case "alt":
      return (
        <AltSectionBreak title={title} className={className}>
          {children}
        </AltSectionBreak>
      )
    default:
      return (
        <MainSectionBreak title={title} className={className}>
          {children}
        </MainSectionBreak>
      )
  }
}

SectionBreak.defaultProps = {
  mode: "main",
  title: "",
  className: "",
}

export default SectionBreak
