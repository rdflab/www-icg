import React from "react"
import { Link } from "gatsby"

const BlueButton = ({ to, children }) => (
  <Link
    to={to}
    // className="border-b-4 border-solid border-blue-600 bg-blue-400 text-white hover:bg-blue-600 trans-ani px-8 py-4 rounded-md uppercase"
    className="border-2 border-solid border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-blue-500 trans-ani px-6 py-4 uppercase rounded-lg"
  >
    {children}
  </Link>
)

export default BlueButton

//font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md rounded px-5 py-3 trans-ani"
