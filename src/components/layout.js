/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"

//import "../assets/css/global.scss"
import "../assets/css/global.scss"

import Footer from "./footer/footer"
import SEO from "./seo"
import { Helmet } from "react-helmet"
import useSiteMetadata from "../hooks/sitemetadata"
import { fab } from "@fortawesome/free-brands-svg-icons"
import {
  faHome,
  faCheck,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faDoorOpen,
  faSearch,
  faTimes,
  faBars,
  faNewspaper,
  faExternalLinkAlt,
  faGlobeAmericas,
  faUsers,
  faChevronUp,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { faClock, faCalendar } from "@fortawesome/free-regular-svg-icons"

library.add(
  fab,
  faHome,
  faClock,
  faMapMarkerAlt,
  faCheck,
  faPhone,
  faEnvelope,
  faDoorOpen,
  faSearch,
  faTimes,
  faBars,
  faNewspaper,
  faExternalLinkAlt,
  faGlobeAmericas,
  faUsers,
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faCalendar,
  faChevronRight
)

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

// export const ACTION_MENU_VISIBLE = 'MENU_VISIBLE'

// export const menuVisibleAction = (visible) => {
//   return { type: ACTION_MENU_VISIBLE, visible }
// }

// const INITIAL_STATE = {
//   menuVisible: false
// }

// const updateState = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case ACTION_MENU_VISIBLE:
//       return Object.assign({}, state, {
//         menuVisible: action.visible
//       })
//     default:
//       return state
//   }
// }

// const store = createStore(updateState)

// // Log the initial state
// console.log('store', store.getState())

const Layout = ({ title, children }) => {
  const siteMetadata = useSiteMetadata()

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
         */}
      </Helmet>

      {title !== "" && <SEO title={title} />}

      {children}

      <Footer siteTitle={siteMetadata.title}></Footer>
    </>
  )
}

Layout.defaultProps = {
  title: "",
}

export default Layout
