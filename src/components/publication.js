/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import publicationStyles from "./publication.module.scss"
import { Link } from "gatsby";

const authorString = authors => {
  let strs = []

  authors.map(author => {
    strs.push(author.lastName + ' ' + author.initials)
  });

  var ret = strs.join(', ')
  var ret = ret.replace(/, ([^,]+)$/, ", and $1");

  return ret
};

const Publication = ({publication, labMap, showLabLink}) => {

  const authors = authorString(publication.authors)
  const labId = publication.labs[0]

  console.log(labId, labMap, )

  let name

  if (labMap.has(labId)) {
    const lab = labMap.get(labId)
    name = lab.faculty.firstName + " " + lab.faculty.lastName +  " Lab"
  } else {
    name = ""
  }

  return (
    <article className={publicationStyles.publication}>
      <div className={publicationStyles.publicationTitle}>{publication.title}</div>
      <div>{authors}</div>
      <div className={publicationStyles.publicationYear}>{publication.year}</div>

      {(name !== "" && showLabLink) &&
        <Link to={`/research-areas/labs/${labId}`}>{name}</Link>
      }
    </article>
  );
};

export default Publication
