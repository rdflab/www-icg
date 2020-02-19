/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {Component} from "react"
import YearFilter from "./yearfilter"

class YearsFilter extends Component {

  constructor(props) {
    super(props)

    this.state = { selectedYears : new Set()}
  }

  handleClick = data => {
    const selectedYears = new Set(this.state.selectedYears)

    if (data.selected) {
      selectedYears.add(data.year)
    } else {
      selectedYears.delete(data.year)
    }

    this.setState({selectedYears: selectedYears}, console.log(this.state));

    console.log('piio', data.year, data.selected, selectedYears)

    this.props.handleClick(selectedYears)
  }

  render() {
    let years= new Set()

    for (let publication of this.props.publications) {
      if (publication.year !== -1) {
        years.add(publication.year)
      }
    }

    return(
      <>
        {
          Array.from(years).sort().reverse().map((year, index) => {
            return(<YearFilter key={index} handleClick={this.handleClick} year={year} />)
          })
        }
      </>
    )
  }
  
  

  
}

export default YearsFilter
