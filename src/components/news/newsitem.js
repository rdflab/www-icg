import React from "react"

import HTMLDiv from "../htmldiv"
import Column from "../column"
import WhiteLink from "../links/whitelink"
import Card from "../card"

const NewsItem = ({ item }) => {
  return (
    <Card className="mb-8 bg-columbia-secondary-blue text-white">
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
    </Card>
  )
}

export default NewsItem
