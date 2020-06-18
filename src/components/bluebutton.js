import React from "react"
import { Link } from "gatsby"

const BlueButton = ({ to, children }) => (
  <Link
    to={to}
    className="border-b-4 border-solid border-blue-700 bg-blue-500 text-white hover:bg-blue-700 font-semibold trans-ani uppercase px-5 py-4 rounded-md"
  >
    {children}
  </Link>
)

export default BlueButton

//font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md rounded px-5 py-3 trans-ani"
