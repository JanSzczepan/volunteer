import { Link } from 'react-router-dom'
import { FaUserPlus, FaUsers, FaSearch } from 'react-icons/fa'

import AboutCard from '../../../components/AboutCard/AboutCard'
import styles from '../About.module.scss'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { UserProfile } from '../../../App'

const CARDS_LIST = [
   {
      text: 'Dodawaj wolontariaty',
      description: 'Volunteer to aplikacja, która w łatwy sposób pozwoli ci zorganizować wolontariat. Dodaj tytuł, opis, datę, miasto i zdjęcie - to tyle, gotowe!',
      icon: FaUserPlus,
      link: '/volunteer/events/add-event',
   },
   {
      text: 'Zostań wolontariuszem',
      description: 'Dzięki naszej aplikacji możesz zgłosić uczestnictwo w dowolnym wolontariacie. Jeśli coś ci wypadło możesz zrezygnować, ale uważaj, nie możesz drugi raz uczestniczyć w tym samym wolontariacie.',
      icon: FaUsers,
      link: '/volunteer/events/all',
   },
   {
      text: 'Przeglądaj wolontariaty',
      description: 'Możesz zobaczyć wszystkie dostępne wolontariaty, wyszukać te które cię interesują oraz sprawdzić jakie będą organizowane w najbliższych dniach.',
      icon: FaSearch,
      link: '/volunteer/events/upcoming',
   },
]

const AboutP2 = () => {
   const [user] = useLocalStorage<UserProfile>('profile', {})

   return (
      <section className={styles.aboutSection}>
         <div className={`section ${styles.aboutContainer}`}>
            <p className={styles.text}>Dlaczego my</p>
            <h3 className={styles.headerText}>Jak to działa?</h3>
            <div className={styles.cardsContainer}>
               {CARDS_LIST.map((card, i) => (
                  <Link
                     className={styles.card}
                     to={user?.user ? card.link : '/volunteer/login'}
                     key={i}
                  >
                     <AboutCard card={card} />
                  </Link>
               ))}
            </div>
         </div>
      </section>
   )
}

export default AboutP2
