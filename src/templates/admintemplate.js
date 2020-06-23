import React from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import BlueLink from "../components/links/bluelink"
import SiteSearch from "../components/search/sitesearch"
import Container from "../components/container"
import FlHdDiv from "../components/flhddiv"
//import Breadcrumb from "../components/breadcrumb2"

// nav="Administration"

const AdminTemplate = ({ path, pageContext }) => {
  return (
    <CrumbTitleLayout
      path={path}
      crumbs={[["Administration", "/administration"]]}
      title="Administration"
      headerContent={<SiteSearch />}
      bgColorClass="bg-white"
    >
      <FlHdDiv>
        <Container className="py-8">
          <div className="lg:w-1/2 border-t-4 border-b-4 border-solid border-gray-400 py-4 my-8">
            <h3>Administration Staff</h3>
            <p className="my-2">
              Browse a complete listing of our administration staff.
            </p>

            <BlueLink to="/administration/staff">Learn more</BlueLink>
          </div>
        </Container>
      </FlHdDiv>
    </CrumbTitleLayout>
  )
}

export default AdminTemplate
