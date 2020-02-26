import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { getEvents } from "../utils/gcal"
import CalEvent from "../components/calendar/calevent"
import Columns from "../components/columns"
import Column from "../components/column"
import DayPicker, { DateUtils } from "react-day-picker"
import "../components/calendar/calendar.scss"
import SideBar from "../components/sidebar/sidebar"
import SearchBar from "../components/searchbar"

const Events = () => {
  const [events, setEvents] = useState([])
  const [selectedDays, setSelectedDays] = useState([])

  useEffect(() => {
    getEvents(e => {
      setEvents(e)
    })
  }, [])

  const handleInputChange = e => {}

  const handleDayClick = (day, { selected }) => {
    // const { selectedDays } = this.state;
    // if (selected) {
    //   const selectedIndex = selectedDays.findIndex(selectedDay =>
    //     DateUtils.isSameDay(selectedDay, day)
    //   );
    //   selectedDays.splice(selectedIndex, 1);
    // } else {
    //   selectedDays.push(day);
    // }

    setSelectedDays([day])
  }

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
        <Column className="is-hidden-tablet">
          <SideBar>
            <SearchBar
              handleInputChange={handleInputChange}
              placeholder="Type to find events"
            />
            <div className="has-text-centered">
              <DayPicker
                selectedDays={selectedDays}
                onDayClick={handleDayClick}
              />
            </div>
          </SideBar>
        </Column>
        <Column w={8}>{ret}</Column>
        <Column className="is-hidden-mobile">
          <SideBar>
            <SearchBar
              handleInputChange={handleInputChange}
              placeholder="Type to find events"
            />
            <div className="has-text-centered">
              <DayPicker
                selectedDays={selectedDays}
                onDayClick={handleDayClick}
              />
            </div>
          </SideBar>
        </Column>
      </Columns>
    </Layout>
  )
}

export default Events
