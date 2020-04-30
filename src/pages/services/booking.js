import React from "react"
import CrumbLayout from "../../components/crumblayout"
import CrumbContainerLayout from "../../components/crumbcontainerlayout"
import SiteSearch from "../../components/search/sitesearch"
import H1 from "../../components/headings/h1"

const Booking = () => (
  <CrumbLayout
    crumbs={[
      ["Services", "/services"],
      ["Instrument Booking", "/services/booking"],
    ]}
    title="Instrument Booking"
    headerComponent={<SiteSearch />}
  >
    <div className="w-full h-full min-h-full overflow-hidden">
      <div
        className="iframe-container w-full h-full min-h-full"
        style={{ minHeight: "60rem" }}
      >
        <iframe
          align="center"
          src="https://d3b9an2m79xfyz.cloudfront.net"
          frameborder="0"
          allowfullscreen=""
          width="100%"
          height="100%"
          title="Booking"
        ></iframe>
      </div>
    </div>
  </CrumbLayout>
)

export default Booking
