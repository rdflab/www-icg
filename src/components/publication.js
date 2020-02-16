/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"

const authorString = authors => {
  let strs = []

  authors.map((author) => {
    strs.push(author.lastName + ' ' + author.initials)
  });

  return strs.join(', ')
};

const Publication = ({publication}) => {

  const authors = authorString(publication.authors)

  return (
    <article>
      <div>{publication.title}</div>
      <div>{authors}</div>
    </article>
  );
};

export default Publication
