import { Link } from 'react-router-dom'

import AboutCard from '../../../components/AboutCard/AboutCard'
import { OPTIONS } from '../../../constants'
import styles from '../About.module.scss'

const AboutP4 = () => {
   return (  
      <section className={styles.aboutSection}>
         <div className={`section ${styles.aboutContainer}`}>
            <p className={styles.text}>Wolontariaty</p>
            <h3 className={styles.headerText}>Jakie są rodzaje wolontariatów?</h3>
            <div className={styles.cardsContainer}>
               {OPTIONS.map((card, i) => (
                  <Link className={styles.card} to={`/volunteer/events/search?search=${card.value || 'none'}`} key={i}>
                     <AboutCard card={card}/>
                  </Link>
               ))}
            </div>
         </div>
      </section>
   )
}
 
export default AboutP4