/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: number
  height: string
  width: string
  public_id: string
  format: string
  blurDataUrl?: string
}

export interface ImageProps2 {
  id: number;
  height: number;
  width: number;


  thumbnail: string;
  categories: any[];
  description: string;
  likeCnt: number;
  nickname: string;
  profileImgPath: string;
  userId: number;
  blurDataUrl?:string
  workWidth: number;
  safeMode: boolean;
  deleted: boolean;
  liked: boolean;
  adult: boolean;
  published: boolean;
  uploaded:boolean;}
  
export interface SharedModalProps {
  index: number

  images?: ImageProps2[]
  currentPhoto?: ImageProps2
  changePhotoId: (newVal: number) => void
  closeModal: () => void
  navigation: boolean
  direction?: number
}