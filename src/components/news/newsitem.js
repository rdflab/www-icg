import React from "react"
import NewsItemDate from "./newsitemdate"
import H5 from "../headings/h5"
import styled from "styled-components"
import { Link } from "gatsby"

const StyledNews = styled.article`
  border-bottom: solid 1px lightgray;
  margin-bottom: 2rem;
`

const NewsItem = ({ item }) => (
  <StyledNews>
    <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
    <H5>
      <Link to={item.frontmatter.path}>{item.frontmatter.title}</Link>
    </H5>

    <div dangerouslySetInnerHTML={{ __html: item.excerpt }} />
  </StyledNews>
)

export default NewsItem
