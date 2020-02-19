/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import personStyles from "./person.module.scss"
import { Link } from "gatsby";

const Person = ({person, labMap, showLabLink}) => {

  return (
    <div className={personStyles.person}>
      {person.firstName} {person.lastName}
    </div>
  );
};

export default Person
