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

  authors.map((author) => {
    strs.push(author.lastName + ' ' + author.initials)
  });

  var ret = strs.join(', ')
  var ret = ret.replace(/, ([^,]+)$/, ", and $1");

  return ret
};

const Publication = ({publication}) => {

  const authors = authorString(publication.authors)

  return (
    <article className={publicationStyles.publication}>
      <div className={publicationStyles.publicationTitle}>{publication.title}</div>
      <div>{authors}</div>
      <div className={publicationStyles.publicationYear}>{publication.year}</div>
      <Link to={`/research-areas/labs/${publication.labId}`}>lab</Link>
    </article>
  );
};

export default Publication
