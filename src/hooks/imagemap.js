const useImageMap = (data) => {
  const imageMap = {}

  for (let { node } of data.files.edges) {
    const file = node

    if (file.ext === ".jpg") {
      imageMap[file.name] = file
    }
  }

  if (data.generic !== undefined) {
    imageMap["generic"] = data.generic
  }

  return imageMap
}

export default useImageMap
