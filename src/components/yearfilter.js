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
  }

  handleClick = e => {
    const data = {year: this.props.year, selected: !this.props.selected }
    this.props.handleClick(data)
  }

  render() {
    return(
      <div onClick={this.handleClick} className={`${yearFilterStyles.yearFilter} ${this.props.selected ? yearFilterStyles.yearFilterSelected : ""}`}>{this.props.year}</div>
    )
  }
  
  

  
}

export default YearFiler
