import React from "react"
import styled from "styled-components"

const StyledDiv = styled.div`
  color: gray;
  margin-bottom: 2rem;
`

const SearchSummary = ({ count, single, plural }) => (
  <StyledDiv>
    {count} {count === 1 ? single : plural} found
  </StyledDiv>
)

export default SearchSummary
