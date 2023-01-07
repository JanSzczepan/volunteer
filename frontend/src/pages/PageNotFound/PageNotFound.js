import { Link } from 'react-router-dom'

import Image from '../../images/not_found.jpg'
import styles from './PageNotFound.module.scss'

const LINKS_LIST = [
   { text: 'O nas', link: '/volunteer/about' },
   { text: 'Wolontariaty', link: '/volunteer/events/upcoming' },
]

const PageNotFound = () => {
   return (
      <section className={`section ${styles.notFoundSection}`}>
         <img
            className={styles.notFoundImage}
            src={Image}
            alt='404 strona nie znaleziona'
         />
         <h3 className={styles.headerText}>404</h3>
         <h5 className={styles.subHeaderText}>Strona nie została odnaleziona</h5>
         <p className={styles.text}>Poniżej znajdziesz przydatne linki:</p>
         <div className={styles.linksContainer}>
            {LINKS_LIST.map((item, i) => (
               <Link
                  className={styles.link}
                  to={item.link}
                  key={i}
               >
                  {item.text}
               </Link>
            ))}
         </div>
      </section>
   )
}

export default PageNotFound
