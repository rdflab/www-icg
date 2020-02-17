/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {Component} from "react"
import YearFiler from "./yearfilter"

class YearsFilter extends Component {

  constructor(props) {
    super(props)
  }

  handleClick = data => {
    const yearMap = new Map(this.state.yearMap)
    const year = data.year
    const selected = !yearMap.get(year)
    yearMap.set(year, selected)

    this.setState({yearMap}, console.log(this.state));

    console.log('piio', data.year, data.selected, yearMap)

    let selectedMap = new Map()

    for (let year of yearMap.keys()) {
      if (yearMap.get(year)) {
        selectedMap.set(year, true)
      }
    }

    console.log('seel', selectedMap)

    this.props.handleClick(selectedMap)
  }

  render() {
    let yearMap = new Map()

    for (let publication of props.publications) {
      if (publication.year !== -1) {
        yearMap.set(publication.year, false)
      }
    }

    let comps = []

    for (let year of Array.from(yearMap.keys()).sort().reverse()) {
      comps.push(<YearFiler handleClick={this.handleClick} year={year} selected={yearMap.get(year)} />)
    }
  
    return(
      <>
        {comps}
      </>
    )
  }
  
  

  
}

export default YearsFilter
