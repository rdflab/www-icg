import React from "react"
import SideBarNewsItem from "./sidebarnewsitem"

const SideBarNews = ({ allNews, top }) => (
  <>
    {allNews.slice(0, top).map((item, index) => (
      <SideBarNewsItem key={index} item={item} />
    ))}
  </>
)

SideBarNews.defaultProps = {
  top: 10,
}

export default SideBarNews
