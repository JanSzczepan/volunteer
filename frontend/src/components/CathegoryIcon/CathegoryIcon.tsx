import { OPTIONS } from '../../constants'
import styles from './CathegoryIcon.module.scss'

type CathegoryIconProps = {
   cathegory: string
   className: string
}

const CathegoryIcon = ({ cathegory, className }: CathegoryIconProps) => {
   return (
      <>
         {OPTIONS.map((option, i) => {
            if (option.value === cathegory) {
               const Icon = option.icon

               return (
                  <Icon
                     className={styles[className]}
                     key={i}
                  />
               )
            } else return null
         })}
      </>
   )
}

export default CathegoryIcon
