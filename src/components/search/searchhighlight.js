import React from "react"

const SearchHighlight = ({ text, search, p, l, highlightClassName }) => {
  if (search !== "") {
    p = text.toLowerCase().indexOf(search)
    l = search.length
  }

  if (p !== -1) {
    const n = p + l
    const s1 = text.substring(0, p)
    const s2 = text.substring(p, n)
    const s3 = text.substring(n)

    return (
      <>
        <span>{s1}</span>
        <span className={highlightClassName}>{s2}</span>
        <span>{s3}</span>
      </>
    )
  } else {
    return text
  }
}

SearchHighlight.defaultProps = {
  search: "",
  l: -1,
  p: -1,
  highlightClassName: "bg-blue-100 text-blue-400",
}

export default SearchHighlight
