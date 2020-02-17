/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {Component} from "react"
import yearFilterStyles from "./yearfilter.module.scss"

class YearFiler extends Component {

  constructor(props) {
    super(props)

    this.state = {selected : false}
  }

  handleClick = e => {
    const data = {year: this.props.year, selected: !this.state.selected }

    this.setState({selected: data.selected})

    this.props.handleClick(data)
  }

  render() {
    return(
      <div onClick={this.handleClick} className={`${yearFilterStyles.yearFilter} ${this.state.selected ? yearFilterStyles.yearFilterSelected : ""}`}>{this.props.year}</div>
    )
  }
  
  

  
}

export default YearFiler
