import React from "react"
import CrumbLayout from "../components/crumblayout"
import Card from "../components/card"
import Columns from "../components/columns"
import Column from "../components/column"

const Contact = () => (
  <CrumbLayout
    crumbs={[
      ["Home", "/"],
      ["Contact", "/contact"],
    ]}
    title="Contact Us"
  >
    <Columns>
      <Column w="1/2">
        {/* <Card> */}
        {/* <iframe
            width="425"
            height="350"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-73.94093066453935%2C40.839045405350824%2C-73.93842011690141%2C40.840475992930344&amp;layer=mapnik"
          ></iframe> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.4630742859304!2d-73.94173524903421!3d40.839755837625155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f69cf9446ff1%3A0x523dcfdc4ca47584!2s1130%20St%20Nicholas%20Ave%2C%20New%20York%2C%20NY%2010032!5e0!3m2!1sen!2sus!4v1583356250505!5m2!1sen!2sus"
          width="600"
          height="450"
          frameborder="0"
          allowfullscreen=""
        ></iframe>
        {/* <br />
          <small>
            <a href="https://www.openstreetmap.org/#map=19/40.83976/-73.93968">
              View Larger Map
            </a>
          </small> */}
        {/* </Card> */}
      </Column>
      <Column w="1/2">
        <Card>
          <h2>Our Contact Information</h2>
          <div>Herbert Irving Cancer Center</div>
          <div>1130 St Nicholas Ave</div>
          <div>New York, NY 10032</div>
          <div>USA</div>
        </Card>
      </Column>
    </Columns>
  </CrumbLayout>
)

export default Contact
