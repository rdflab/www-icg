import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { getEvents } from "../utils/gcal"
import CalEvent from "../components/calevent"
import Columns from "../components/columns"
import Column from "../components/column"

const Events = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents(e => {
      setEvents(e)
    })
  }, [])

  const ret = []

  events.map((e, index) => {
    ret.push(<CalEvent key={index} event={e} />)
  })

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Events", "/events"],
      ]}
      title="Events"
    >
      <Columns>
        <Column w={8}>{ret}</Column>
        <Column></Column>
      </Columns>
    </Layout>
  )
}

export default Events
