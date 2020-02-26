import React from "react"
import styled from "styled-components"

const StyledDate = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`

const StyledMonth = styled.div`
  text-transform: uppercase;
  font-size: smaller;
`

const StyledDay = styled.div`
  text-transform: uppercase;
  font-size: xx-large;
`

const StyledDayName = styled.div`
  text-transform: uppercase;
  font-size: smaller;
  background: rgba(28, 76, 143, 0.8);
  padding: 0.2rem;
  color: white;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`

const CalEventDate = ({ event, date }) => {
  return (
    <StyledDate>
      <StyledMonth>
        {date.toLocaleString("default", { month: "short" })}
      </StyledMonth>
      <StyledDay>{date.getDay()}</StyledDay>
      <StyledDayName>
        {date.toLocaleString("default", { weekday: "short" })}
      </StyledDayName>
    </StyledDate>
  )
}

export default CalEventDate
