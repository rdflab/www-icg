import React from "react"
import Container from "../components/container"
import CrumbTitleLayout from "../components/crumbtitlelayout"

const Contact = () => (
  <CrumbTitleLayout
    nav="Contact Us"
    title="Contact ICG"
    crumbs={[["Contact Us", "/contact"]]}
  >
    <div className="my-8">
      <Container className="mt-8">
        <div className="lg:w-1/2 p-8 text-xl bg-white shadow-md hover:shadow-lg rounded-lg trans-ani">
          <div>Institute for Cancer Generics</div>
          <div>Herbert Irving Cancer Center, Columbia University</div>
          <div>1130 St Nicholas Ave</div>
          <div>New York, NY 10032</div>
          <div>USA</div>
        </div>
      </Container>

      <Container className="py-8">
        <div className="lg:w-1/2  shadow-md hover:shadow-lg rounded-lg bg-white overflow-hidden trans-ani">
          <div
            className="iframe-container w-full"
            style={{ minHeight: "32rem" }}
          >
            <iframe
              align="center"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.4630742859304!2d-73.94173524903421!3d40.839755837625155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f69cf9446ff1%3A0x523dcfdc4ca47584!2s1130%20St%20Nicholas%20Ave%2C%20New%20York%2C%20NY%2010032!5e0!3m2!1sen!2sus!4v1583356250505!5m2!1sen!2sus"
              frameborder="0"
              allowfullscreen=""
              title="Small map"
            ></iframe>
          </div>
        </div>
      </Container>
    </div>
  </CrumbTitleLayout>
)

export default Contact
