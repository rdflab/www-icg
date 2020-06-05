import React from "react"
import { Link } from "gatsby"

const BlueButton = ({ to, children }) => (
  <Link
    to={to}
    className="border border-solid border-blue-300 bg-white text-blue-400 hover:bg-blue-300 hover:shadow hover:text-white trans-ani uppercase px-4 py-3 rounded"
  >
    {children}
  </Link>
)

export default BlueButton

//font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md rounded px-5 py-3 trans-ani"
