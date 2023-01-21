import { useEffect, useState } from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { AiFillFileImage } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'
import FileBase from 'react-file-base64'

import styles from './ImageUpload.module.scss'

type File = {
   base64: string
   name: string
}

type ImageUploadProps = {
   handleImage: (image: string) => void
}

const ImageUpload = ({ handleImage }: ImageUploadProps) => {
   const [image, setImage] = useState<string>('')
   const [imageInfo, setImageInfo] = useState<string>('')

   useEffect(() => {
      if (!image) {
         handleImage('')
         setImageInfo('')
         return
      }

      handleImage(image)
   }, [image, handleImage, imageInfo])

   return (
      <div className={styles.container}>
         <div className={styles.imageUploadContainer}>
            <div className={styles.inputsContainer}>
               <FileBase
                  type='file'
                  multiple={false}
                  accept='image/png, image/jpeg, image/jpg'
                  onDone={(file: File) => {
                     console.log(file)
                     setImage(file.base64)
                     setImageInfo(file.name)
                  }}
               />
               <button
                  className={styles.uploadButton}
                  type='button'
               >
                  <BsFillPlusCircleFill className={styles.uploadIcon} /> Załącz
               </button>
            </div>
            <p className={styles.supportText}>
               Wspierane pliki:
               <br />
               JPG, JPEG, PNG
            </p>
         </div>
         {image && (
            <div className={styles.imageContainer}>
               <AiFillFileImage className={styles.imageIcon} />
               <p className={styles.imageText}>{imageInfo}</p>
               <button
                  className={styles.trashButton}
                  onClick={() => {
                     setImage('')
                     setImageInfo('')
                  }}
                  type='button'
               >
                  <FaTrash className={styles.trashIcon} />
               </button>
            </div>
         )}
      </div>
   )
}

export default ImageUpload
