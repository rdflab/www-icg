import React from "react"

const AltSectionBreak = ({ title, children, className }) => (
  <>
    <hr className="w-1/12 border-1 border-solid border-blue-700 mt-8 mb-2 text-center mx-auto" />
    
    {title !== "" && (
      <h3 className="text-blue-700 mb-2 text-center">{title}</h3>
    )}

    {children}
  </>
)

AltSectionBreak.defaultProps = {
  title: "",
  className: "",
}

export default AltSectionBreak
