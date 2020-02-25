import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"
import { getEvents } from "../utils/gcal"

const Events = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents(e => {
      setEvents(e)
    })
  }, [])

  const ret = []

  events.map((e, index) => {
    let d = new Date(e.start)
    console.log(d)
    ret.push(
      <div style={{ textAlign: "center" }}>
        <div style={{ textTransform: "uppercase" }}>
          {d.toLocaleString("default", { month: "short" })}
        </div>
        <div>{d.getDay()}</div>
        <div
          style={{
            textTransform: "uppercase",
            padding: "0.5rem",
            backgroundColor: "cornflowerblue",
          }}
        >
          {d.toLocaleString("default", { weekday: "short" })}
        </div>
      </div>
    )
  })

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Events", "/events"],
      ]}
    >
      <SEO title="Events" />

      <Title>Events</Title>

      <div>{ret}</div>
    </Layout>
  )
}

export default Events
