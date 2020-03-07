import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import flattenEdges from "../../utils/flattenedges"
import SlideMenuLink from "./slidemenulink"
import SlideMenuCloseButton from "./slidemenuclosebutton"
import ColumbiaICGImage from "../images/columbiaicgimage"

const SlideMenuContainer = ({ title, onClickHandle, visible }) => {
  const data = useStaticQuery(graphql`
    query {
      links: allSlidemenulinksJson {
        edges {
          node {
            name
            link
          }
        }
      }
    }
  `)

  const links = flattenEdges(data.links.edges)

  return (
    <div
      className={`slide-menu-container-2 ${
        visible ? "slide-menu-container-2-visible" : ""
      }`}
      onClick={onClickHandle}
    >
      <div
        className={`fixed col shadow-xl rounded-lg bg-white overflow-hidden`}
        style={{
          margin: 0,
          padding: 0,
          top: "50vh",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "90%",
          height: "80vh",
        }}
      >
        <div className="row items-center justify-between p-4 mb-4 w-full border-b border-solid border-gray-300">
          <div></div>
          <div>
            <ColumbiaICGImage style={{ width: `200px` }} />
          </div>
          <div className="text-right">
            <SlideMenuCloseButton onClick={onClickHandle} />
            {/* <button
              className="text-blue-columbia focus:outline-none"
              onClick={onClickHandle}
            >
              Done
            </button> */}
          </div>
        </div>
        <div className="px-4">
          {links.map((link, index) => {
            return (
              <div key={index}>
                <SlideMenuLink
                  key={index}
                  to={link.link}
                  active={link.name === title}
                >
                  {link.name}
                </SlideMenuLink>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SlideMenuContainer
