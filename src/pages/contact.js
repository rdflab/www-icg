import React from "react"
import Container from "../components/container"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import FlHdDiv from "../components/flhddiv"
import Card from "../components/card"

// nav="Contact Us"
const Contact = () => (
  <CrumbTitleLayout
    title="Contact Us"
    crumbs={[["Contact Us", "/contact"]]}
    bgColorClass="bg-columbia-light-gray"
  >
    <FlHdDiv>
      <Container>
        <Card showCard={false} className="bg-white p-8">
          <div>Institute for Cancer Generics</div>
          <div>Herbert Irving Cancer Center, Columbia University</div>
          <div>1130 St Nicholas Ave</div>
          <div>New York, NY 10032</div>
          <div>USA</div>
        </Card>

        <Card className="mt-8">
          <div className="iframe-container w-full min-h-128 md:min-h-192">
            <iframe
              align="center"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.4630742859304!2d-73.94173524903421!3d40.839755837625155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f69cf9446ff1%3A0x523dcfdc4ca47584!2s1130%20St%20Nicholas%20Ave%2C%20New%20York%2C%20NY%2010032!5e0!3m2!1sen!2sus!4v1583356250505!5m2!1sen!2sus"
              frameborder="0"
              allowfullscreen=""
              title="Small map"
            ></iframe>
          </div>
        </Card>
      </Container>
    </FlHdDiv>
  </CrumbTitleLayout>
)

export default Contact
