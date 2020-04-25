import React from "react"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import FlatCard from "../components/flatcard"
import Column from "../components/column"
import SiteSearch from "../components/search/sitesearch"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import SmallColumn from "../components/smallcolumn"
import H1 from "../components/headings/h1"

const Contact = () => (
  <CrumbContainerLayout
    crumbs={[["Contact", "/contact"]]}
    title="Contact Us"
    headerComponent={<SiteSearch />}
  >
    <H1 className="text-center">Our Contact Information</H1>

    <div className="text-center">
      <div>Herbert Irving Cancer Center</div>
      <div>1130 St Nicholas Ave</div>
      <div>New York, NY 10032</div>
      <div>USA</div>
    </div>

    <div
      className="iframe-container w-full my-16"
      style={{ minHeight: "42rem" }}
    >
      <iframe
        align="center"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.4630742859304!2d-73.94173524903421!3d40.839755837625155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f69cf9446ff1%3A0x523dcfdc4ca47584!2s1130%20St%20Nicholas%20Ave%2C%20New%20York%2C%20NY%2010032!5e0!3m2!1sen!2sus!4v1583356250505!5m2!1sen!2sus"
        frameborder="0"
        allowfullscreen=""
        title="Small map"
      ></iframe>
    </div>
  </CrumbContainerLayout>
)

export default Contact
