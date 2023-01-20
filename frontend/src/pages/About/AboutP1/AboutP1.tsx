import { Link } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import Image from '../../../images/about_1.jpg'
import styles from './AboutP1.module.scss'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { UserProfile } from '../../../App'

const CHECK_LIST = ['Darmowa Rejestracja', 'Intuicyjny Design', 'Niezawodność']

const AboutP1 = () => {
   const [user] = useLocalStorage<UserProfile>('profile', {})

   return (
      <section className={`section ${styles.aboutSection}`}>
         <header className={styles.header}>
            <div className={styles.headerContainer}>
               <h1 className={styles.headerText}>Organizacja wolontariatów nigdy nie była prostsza</h1>
               <p className={styles.text}>
                  Twórz wolontariaty w łatwy sposób i zgłaszaj chęć udziału w istniejących wolontariatach.
                  <br />
                  Dołącz do nas!
               </p>
               <div className={styles.buttonsContainer}>
                  {!user?.user && (
                     <>
                        <Link
                           to='/volunteer/signup'
                           className={`${styles.authButton} ${styles.signupButton}`}
                           type='button'
                        >
                           Signup
                        </Link>
                        <Link
                           to='/volunteer/login'
                           className={`${styles.authButton} ${styles.loginButton}`}
                           type='button'
                        >
                           Login
                        </Link>
                     </>
                  )}
                  {user?.user && (
                     <Link
                        to='/volunteer/events/add-event'
                        className={styles.addEventButton}
                     >
                        Dodaj Event
                     </Link>
                  )}
               </div>
               <div className={styles.checkContainer}>
                  {CHECK_LIST.map((item, i) => (
                     <div
                        className={styles.check}
                        key={i}
                     >
                        <BsFillCheckCircleFill className={styles.checkIcon} />
                        <p className={styles.checkText}>{item}</p>
                     </div>
                  ))}
               </div>
            </div>
            <img
               className={styles.image}
               src={Image}
               alt='Wolontariaty i wolontariusze'
            />
         </header>
      </section>
   )
}

export default AboutP1
