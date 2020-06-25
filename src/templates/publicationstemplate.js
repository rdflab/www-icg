import React, { useState } from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import SearchBar from "../components/search/searchbar"
import PubSearchResults from "../components/publication/pubsearchresults"
import SiteSearch from "../components/search/sitesearch"
import YearSelector from "../components/filter/yearselector"
import HideSmall from "../components/hidesmall"
import ShowSmall from "../components/showsmall"
import { searchTree } from "../components/search/searchtree"
import Column from "../components/column"
import Container from "../components/container"
import ShareLinks from "../components/share/sharelinks"
import FlHdDiv from "../components/flhddiv"
//import Breadcrumb from "../components/breadcrumb2"

const EMPTY_QUERY = ""

// nav="Publications"

const PublicationsTemplate = ({ path, pageContext }) => {
  const {
    title,
    crumbs,
    selectedTab,
    allPublications,
    showYears,
    showLabLink,
  } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPublications, setFilteredPublications] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [filterYears, setFilterYears] = useState([])

  // const loadPubIndex = () => {
  //   return axios.get(index).then(resp => {
  //     return resp.data
  //   })
  // }

  const search = (pubIndex, q) => {
    let ret = []
    const [indices, words] = searchTree(pubIndex, q)

    for (let i of indices) {
      ret.push(allPublications[i])
    }

    setFilteredPublications(ret)
    setPage(1)
  }

  const handleInputChange = (e) => {
    const q = e.target.value
    const ql = q.toLowerCase()

    setQuery(q)

    // if (q !== "") {
    //   if (pubIndex !== null) {
    //     search(pubIndex, q)
    //   } else {
    //     loadPubIndex().then(data => {
    //       setPubIndex(data)
    //       search(data, q)
    //     })
    //   }
    // }

    let ret = []

    for (let publication of allPublications) {
      let found = publication.title.toLowerCase().includes(ql)

      if (!found) {
        // try authors

        for (let author of publication.authors) {
          if (author.toLowerCase().includes(ql)) {
            found = true
            break
          }
        }
      }

      if (found) {
        ret.push(publication)
      }
    }

    setFilteredPublications(ret)
  }

  const onPageChanged = (data) => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const handleClick = (data) => {
    setFilterYears(data)
    setPage(1)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let publications = hasSearchResults ? filteredPublications : allPublications

  let yearFilteredPublications

  if (filterYears.length > 0 && filterYears[0] !== "All") {
    yearFilteredPublications = publications.filter((publication) => {
      return filterYears.includes(publication.year)
    })
  } else {
    yearFilteredPublications = publications
  }

  const offset = (page - 1) * recordsPerPage
  let pagedPublications = yearFilteredPublications.slice(
    offset,
    offset + recordsPerPage
  )

  return (
    <CrumbTitleLayout
      title="Publications"
      path={path}
      crumbs={crumbs}
      selectedTab={selectedTab}
      headerContent={<SiteSearch />}
      crumbContent={<ShareLinks path={path} />}
      bgColorClass="bg-white"
    >
      <ShowSmall className="py-8">
        <Container>
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find publications..."
            text={query}
          />
        </Container>
      </ShowSmall>

      <HideSmall className="py-8">
        <Container>
          <Column isCentered={true}>
            <div className="w-1/2">
              <SearchBar
                handleInputChange={handleInputChange}
                placeholder="Type to find publications..."
                text={query}
              />
            </div>
          </Column>
        </Container>
      </HideSmall>

      <Container className="pb-8">
        {/* <HideSmall>
            <Column isVCentered={true} className="mt-8 justify-center">
              {showYears && (
                <div>
                  <YearSelector onClick={handleClick} />
                </div>
              )}
            </Column>
          </HideSmall> */}

        <PubSearchResults
          publications={yearFilteredPublications}
          pagedPublications={pagedPublications}
          page={page}
          recordsPerPage={recordsPerPage}
          onPageChanged={onPageChanged}
          showLabLink={showLabLink}
        />
      </Container>
    </CrumbTitleLayout>
  )
}

export default PublicationsTemplate
