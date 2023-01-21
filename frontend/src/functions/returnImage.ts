import { OPTIONS } from '../constants'

const returnImage = (img: string | null | undefined, cathegory: string) => {
   let image = img

   if (image) return image

   OPTIONS.forEach((option) => {
      if (option.value === cathegory) {
         image = option.imgLink
      }
   })

   return image
}

export default returnImage
