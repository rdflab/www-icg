import React from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import BlueLink from "../components/bluelink"
import SiteSearch from "../components/search/sitesearch"
import Container from "../components/container"
import Column from "../components/column"
import FullDiv from "../components/fulldiv"

const AdminTemplate = ({ pageContext }) => {
  return (
    <CrumbTitleLayout
      crumbs={[["Administration", "/administration"]]}
      nav="Administration"
      title="Administration"
      headerComponent={<SiteSearch />}
    >
      <Container>
        <Column className="items-center justify-between my-8">
          <Column className="md:w-5/10">
            <FullDiv className="border-t-4 border-b-4 border-solid border-gray-400 py-4 my-4">
              <h3>Administration Staff</h3>
              <p className="my-2">
                Browse a complete listing of our administration staff.
              </p>

              <BlueLink to="/administration/staff">Learn more</BlueLink>
            </FullDiv>
          </Column>
        </Column>
      </Container>
    </CrumbTitleLayout>
  )
}

export default AdminTemplate
