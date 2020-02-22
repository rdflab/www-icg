import React from "react"
import NewsSideBarItem from "./newssidebaritem"

const NewsSideBar = ({ allNews, top }) => (
  <>
    {allNews.slice(0, top).map((item, index) => (
      <NewsSideBarItem key={index} item={item} />
    ))}
  </>
)

NewsSideBar.defaultProps = {
  top: 10,
}

export default NewsSideBar
