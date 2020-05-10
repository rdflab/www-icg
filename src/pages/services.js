import React from "react"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import SiteSearch from "../components/search/sitesearch"
import H1 from "../components/headings/h1"
import Column from "../components/column"
import Leica from "../components/images/equipment/leica"
import FullDiv from "../components/fulldiv"
import Button from "../components/button"

const Services = () => (
  <CrumbContainerLayout
    crumbs={[["Services", "/services"]]}
    title="Services"
    headerComponent={<SiteSearch />}
  >
    <H1 className="text-center">Services</H1>

    <Column>
      <Column w={4}>
        <Leica className="w-full" />
      </Column>
      <Column w={8}>
        <FullDiv>
          <h2>A microscope</h2>
          <p>Something about microscope availability.</p>
          <div className="mt-8">
            <Button to="/services/booking">Book slot</Button>
          </div>
        </FullDiv>
      </Column>
    </Column>
  </CrumbContainerLayout>
)

export default Services
