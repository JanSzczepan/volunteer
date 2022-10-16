import { Link } from 'react-router-dom'
import { FaUserPlus, FaUsers, FaSearch } from 'react-icons/fa'

import styles from './AboutP2.module.scss'

const CARDS_LIST = [
   {
      name: 'Dodawaj wolontariaty',
      text: 'Volunteer to aplikacja, która w łatwy sposób pozwoli ci zorganizować wolontariat. Dodaj tytuł, opis, datę, miasto i zdjęcie - to tyle, gotowe!',
      icon: <FaUserPlus className={styles.cardIcon}/>,
      link: '/events/add-event'
   },
   {
      name: 'Zostań wolontariuszem',
      text: 'Dzięki naszej aplikacji możesz zgłosić uczestnictwo w dowolnym wolontariacie. Jeśli coś ci wypadło możesz zrezygnować, ale uważaj, nie możesz drugi raz uczestniczyć w tym samym wolontariacie.',
      icon: <FaUsers className={styles.cardIcon}/>,
      link: '/events/all'
   },
   {
      name: 'Przeglądaj wolontariaty',
      text: 'Zobacz jakie wolontariaty zostały zorganizowane w twojej okolicy dzisiaj lub jutro. Możesz zobaczyć wszystkie dostępne wolontariaty lub wyszukać tych, które cię interesują.',
      icon: <FaSearch className={styles.cardIcon}/>,
      link: '/events/upcoming'
   }
]

const AboutP2 = () => {

   const user = JSON.parse(window.localStorage.getItem('profile'))

   return (  
      <section className={styles.aboutSection}>
         <div className={`section ${styles.aboutContainer}`}>
            <p className={styles.text}>Dlaczego my</p>
            <h3 className={styles.headerText}>Jak to działa?</h3>
            <div className={styles.cardsContainer}>
               {CARDS_LIST.map((card, i) => (
                  <Link className={styles.card} to={user?.user ? card.link : '/login'} key={i}>
                     <div className={styles.cardIconContainer}>
                        {card.icon}
                     </div>
                     <h5 className={styles.cardHeaderText}>{card.name}</h5>
                     <p className={styles.cardText}>{card.text}</p>
                  </Link>
               ))}
            </div>
         </div>
      </section>
   )
}
 
export default AboutP2