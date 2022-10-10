import { BsSearch } from 'react-icons/bs'

import styles from './Search.module.scss'

const Search = () => {
   return (  
      <div className={styles.container}>
         <BsSearch className={styles.icon}/>
         <input 
            className={styles.input}
            type='text'
            placeholder='Szukaj eventu...'
         />
      </div>
   )
}
 
export default Search