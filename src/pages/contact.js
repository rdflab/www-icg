import React from "react"
import Layout from "../components/layout"
import Card from "../components/card"
import Columns from "../components/columns"
import Column from "../components/column"

const Contact = () => (
  <Layout
    crumbs={[
      ["Home", "/"],
      ["Contact", "/contact"],
    ]}
    title="Contact"
  >
    <Columns>
      <Column w={6}>
        <Card>
          <iframe
            width="425"
            height="350"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-73.94093066453935%2C40.839045405350824%2C-73.93842011690141%2C40.840475992930344&amp;layer=mapnik"
          ></iframe>
          <br />
          <small>
            <a href="https://www.openstreetmap.org/#map=19/40.83976/-73.93968">
              View Larger Map
            </a>
          </small>
        </Card>
      </Column>
      <Column w={6}>
        <Card>
          <h4>Our Contact Information</h4>
          <div>Herbert Irving Cancer Center</div>
          <div>1130 St Nicholas Ave</div>
          <div>New York, NY 10032</div>
        </Card>
      </Column>
    </Columns>
  </Layout>
)

export default Contact
