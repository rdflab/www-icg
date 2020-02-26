import React from "react"
import Card from "../card"
import newsItemStyles from "./newsitem.module.scss"
import NewsItemDate from "./newsitemdate"
import BodyLink from "../bodylink"
import H5 from "../h5"
import styled from "styled-components"

const StyledNews = styled.article`
  border-bottom: solid 1px lightgray;
  margin-bottom: 2rem;
`

const NewsItem = ({ item }) => (
  <StyledNews>
    <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
    <H5>
      <BodyLink to={item.frontmatter.path}>{item.frontmatter.title}</BodyLink>
    </H5>

    <div dangerouslySetInnerHTML={{ __html: item.excerpt }} />
  </StyledNews>
)

export default NewsItem
