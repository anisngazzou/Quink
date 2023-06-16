// import cloudinary from './cloudinary'

let cachedResults

export default async function getResults() {
  if (!cachedResults) {
    const fetchedResults = []

    cachedResults = fetchedResults
  }

  return cachedResults
}
