import { OPTIONS } from '../../constants'
import styles from './CathegoryIcon.module.scss'

const CathegoryIcon = ({ cathegory, className }) => {
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
            }
         })}
      </>
   )
}

export default CathegoryIcon
