import type { ImageProps, ImageProps2 } from './types'

const cache = new Map<ImageProps2, string>()

export default async function getBase64ImageUrl(
  image: ImageProps2
): Promise<string> {
  let url = ''
  // if (url) {
  //   return url
  // }
  const response = await fetch(
    `https://cdn.prinker.net${image.thumbnail}`
  )
  console.log("🚀 ~ file: generateBlurPlaceholder.ts:15 ~ response:", response)
  const buffer = await response.arrayBuffer()

  // Convert the ArrayBuffer to a base64-encoded string
  const base64String = Buffer.from(buffer).toString('base64')
  url = `data:image/jpeg;base64,${base64String}`

  console.log("🚀 ~ file: generateBlurPlaceholder.ts:21 ~ url:", url)
  cache.set(image, url)
  return url
}