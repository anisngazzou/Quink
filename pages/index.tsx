import React,{ useState ,useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import  {useRouter}  from 'next/router'

import Bridge from '../components/Icons/Bridge'
import Logo from '../components/Icons/Logo'
import Modal from '../components/Modal'

import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps, ImageProps2 } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import jsonDataLiked from "../constants/liked.json";


const Home: NextPage = ({ images }: { images: ImageProps2[] }) => {
  const arrayOfficielDesinger : string[] = ["Prinker Korea Inc.","PrinkerAz","Pixabay","M_Ink"]
  const router = useRouter()
  const[imgIndex,setImgIndex] = useState(0)
 const[bestOf,setBestOf] = useState(false)
  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)
const dataToMap =jsonDataLiked.contents.map((f,ik)=>{
  return {id:ik,...f}
}) .sort((a, b) => b.likeCnt - a.likeCnt)
  const reorderedImgList = jsonDataLiked.contents.map((f,ik)=>{
  return {id:ik,...f}
}).sort((a, b) => {
  const aNickname = a.nickname.toLowerCase();
  const bNickname = b.nickname.toLowerCase();
  const aIndex = arrayOfficielDesinger.indexOf(aNickname);
  const bIndex = arrayOfficielDesinger.indexOf(bNickname);

  if (aIndex === -1 && bIndex === -1) {
    // If both nicknames are not found in arrayOfficielDesinger,
    // maintain the original order
    return 0;
  } else if (aIndex === -1) {
    // If only aNickname is not found, bNickname should come first
    return 1;
  } else if (bIndex === -1) {
    // If only bNickname is not found, aNickname should come first
    return -1;
  } else {
    // Both nicknames are found in arrayOfficielDesinger,
    // sort based on their indices in the array
    return aIndex - bIndex;
  }
});

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={dataToMap}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
      
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
         <h1 className='mt-8 mb-4 text-6xl font-bold uppercase tracking-widest '> QUINK</h1>
            <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
             INK IN A BLINK
            </h1>
            <input  className='w-96 h-14 px-2 py-2 rounded-md z-50 text-gray-800 text-lg bg-gray-200 ' placeholder='search' type='text' onChange={(e)=>console.log(e)}/>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
             Lorem ipsum dolor sit  consectetur adipisicing elit. Id esse error minima expedita exercitationem maiores.
            </p>
             <button
              className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
onClick={()=>{
  setBestOf((e)=>!e)
}}
            >
              Best Of
            </button> 
          </div>
          {bestOf?(<>
            {dataToMap.map((image:ImageProps2) => (
            <Link
              key={image.id}
              // href={`https://cdn.prinker.net${image.thumbnail}`}
              href={`/?photoId=${image.id}`}
              as={`/p/${image.id}`}
              onClick={()=>setImgIndex(image.id)}
              ref={image.id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              {arrayOfficielDesinger.includes(image.nickname) && <p>⭐⭐⭐</p>}
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                // placeholder="blur"
                blurDataURL={null}
                src={`https://cdn.prinker.net${image.thumbnail}`}
              
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
             <p>{image.description}</p> 
            </Link>
          ))}
            </>):(<>
              {dataToMap.map((image:ImageProps2) => (
            <Link
              key={image.id}
              // href={`https://cdn.prinker.net${image.thumbnail}`}
              href={`/?photoId=${image.id}`}
              as={`/p/${image.id}`}
              onClick={()=>setImgIndex(image.id)}
              ref={image.id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              {arrayOfficielDesinger.includes(image.nickname) && <p>⭐⭐⭐</p>}
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                // placeholder="blur"
                blurDataURL={null}
                src={`https://cdn.prinker.net${image.thumbnail}`}
              
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
             <p>{image.description}</p> 
            </Link>
          ))}
</>)
          }
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Thank you to{' '}
        <a
          href="https://edelsonphotography.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Josh Edelson
        </a>
        ,{' '}
        <a
          href="https://www.newrevmedia.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Jenny Morgan
        </a>
        , and{' '}
        <a
          href="https://www.garysextonphotography.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Gary Sexton
        </a>{' '}
        for the pictures.
      </footer>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const results ={resources:[]}
  // await cloudinary.v2.search
  //   .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
  //   .sort_by('public_id', 'desc')
  //   .max_results(400)
  //   .execute()
  let reducedResults: ImageProps[] = []

  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const blurImagePromises = results.resources.map((image: ImageProps2) => {
    return getBase64ImageUrl(image)
  })
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  return {
    props: {
      images: reducedResults,
    },
  }
}
