import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '../../components/Carousel'
import getResults from '../../utils/cachedImages'
import getBase64ImageUrl from '../../utils/generateBlurPlaceholder'
import type { ImageProps, ImageProps2 } from '../../utils/types'
import jsonDataLiked from "../../constants/liked.json";

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const dataToMap =jsonDataLiked.contents.map((f,ik)=>{
    return {id:ik,...f}
  }) .sort((a, b) => b.likeCnt - a.likeCnt)
  const router = useRouter()
  const { photoId } = router.query
  let index = Number(photoId)

  const currentPhotoUrl = `https://cdn.prinker.net${dataToMap[index].thumbnail}`

  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={dataToMap[index]} index={index} />
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const results = await getResults()

  let reducedResults: ImageProps2[] = []
  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      ...result
     
    })
    i++
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId)
  )
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  }
}

export async function getStaticPaths() {
  const results = {resources:[]}
  let fullPaths = []
  for (let i = 0; i < results.resources.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } })
  }

  return {
    paths: fullPaths,
    fallback: false,
  }
}
