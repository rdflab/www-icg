import React from "react"
import NewsItemDate from "./newsitemdate"
import BlueLink from "../links/bluelink"

import HTMLDiv from "../htmldiv"
import Column from "../column"
import WhiteLink from "../links/whitelink"

const NewsItem = ({ item }) => {
  return (
    <article className="w-full mb-8 bg-columbia-secondary-blue shadow hover:shadow-md rounded text-white overflow-hidden trans-ani">
      <Column className="justify-between">
        <div className="p-8 w-full">
          <Column className="justify-between uppercase text-white-80">
            <div>
              <h5>{item.frontmatter.category}</h5>
            </div>
            <div>
              <h5>{item.frontmatter.date}</h5>
            </div>
          </Column>

          <h3 className="mt-4">
            <WhiteLink
              aria-label={`Goto news about ${item.frontmatter.title}`}
              to={item.frontmatter.path}
            >
              {item.frontmatter.title}
            </WhiteLink>
          </h3>
          <HTMLDiv className="mt-2 text-xl" html={item.excerpt} />
        </div>
        <div>
          <div className="w-56 h-56"></div>
        </div>
      </Column>
    </article>
  )
}

export default NewsItem
