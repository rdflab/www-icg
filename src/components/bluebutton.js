import React from "react"
import { Link } from "gatsby"

const BlueButton = ({ to, children }) => (
  <Link
    to={to}
    className="border-2 border-solid border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold trans-ani uppercase px-5 py-4 rounded"
  >
    {children}
  </Link>
)

export default BlueButton

//font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md rounded px-5 py-3 trans-ani"
