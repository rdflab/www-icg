import React from "react"
import { Link } from "gatsby"

const Button = ({ to, children }) => (
  <Link to={to} className="btn btn-blue">
    {children}
  </Link>
)

export default Button
