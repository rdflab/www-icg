import React, { useState } from "react"
import CrumbLayout from "../components/crumblayout"
import SearchBar from "../components/search/searchbar"
import PubSearchResults from "../components/publication/pubsearchresults"
import SiteSearch from "../components/search/sitesearch"
import YearSelector from "../components/filter/yearselector"
import HideSmall from "../components/hidesmall"
import ShowSmall from "../components/showsmall"
import { searchTree } from "../components/search/searchtree"
import Column from "../components/column"
import Container from "../components/container"
import H from "../components/headings/h"

const EMPTY_QUERY = ""

const PublicationsTemplate = ({ pageContext }) => {
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

  const handleInputChange = e => {
    const q = e.target.value

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
      if (publication.title.toLowerCase().includes(q.toLowerCase())) {
        ret.push(publication)
      }
    }

    setFilteredPublications(ret)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const handleClick = data => {
    setFilterYears(data)
    setPage(1)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let publications = hasSearchResults ? filteredPublications : allPublications

  let yearFilteredPublications

  if (filterYears.length > 0 && filterYears[0] !== "All") {
    yearFilteredPublications = publications.filter(publication => {
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
    <CrumbLayout
      crumbs={crumbs}
      selectedTab={selectedTab}
      title={title}
      headerComponent={<SiteSearch />}
    >
      <H>Publications</H>
      <Container className="mt-8">
        <ShowSmall>
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find publications..."
            text={query}
          />
        </ShowSmall>

        <HideSmall>
          <Column isCentered={true} className="mb-8">
            <div className="w-1/2">
              <SearchBar
                handleInputChange={handleInputChange}
                placeholder="Type to find publications..."
                text={query}
              />
            </div>
          </Column>
        </HideSmall>

        <HideSmall>
          <Column isVCentered={true} className="mt-8 justify-center">
            {showYears && (
              <div>
                <YearSelector onClick={handleClick} />
              </div>
            )}
          </Column>
        </HideSmall>

        <PubSearchResults
          publications={yearFilteredPublications}
          pagedPublications={pagedPublications}
          page={page}
          recordsPerPage={recordsPerPage}
          onPageChanged={onPageChanged}
          showLabLink={showLabLink}
        />
      </Container>
    </CrumbLayout>
  )
}

export default PublicationsTemplate
