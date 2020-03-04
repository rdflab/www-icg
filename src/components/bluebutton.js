import React from "react"
import { Link } from "gatsby"

const BlueButton = ({ to, children }) => (
  <Link
    to={to}
    className="font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md rounded px-5 py-3 trans-ani"
  >
    {children}
  </Link>
)

export default BlueButton
