import { Link } from 'react-router-dom'
import { ImLocation2 } from 'react-icons/im'
import { FaDog } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { BsClock } from 'react-icons/bs'

import styles from './EventCard.module.scss'

const EventCard = ({ event }) => {
   
   const { _id, title, date, cathegory, city, selectedFile, participants, participantsNames, banned } = event
   const hours = (new Date(date)).getHours()
   const minutes = (new Date(date)).getMinutes()
   const latestParticipants = participantsNames.slice(-3)

   const user = JSON.parse(window.localStorage.getItem('profile'))
   
   const join = Boolean(!participants.includes(user?.user._id))
   const ban = Boolean(banned.includes(user?.user._id))

   return (  
      <div className={styles.card}>
         <div className={styles.imageContainer}>
            <div className={styles.frontContainer}>
               <div className={styles.textContainer}>
                  <h3 className={styles.title}>{title}</h3>
                  <h4 className={styles.location}>
                     <ImLocation2 className={styles.locationIcon}/>
                     {city}
                  </h4>
                  <p className={styles.time}>
                     <BsClock className={styles.clockIcon}/>
                     {hours}:{minutes}
                  </p>
               </div>
               <div className={styles.outsideIconContainer}>
                  <div className={styles.insideIconContainer}>
                     <FaDog className={styles.cathegoryIcon}/>
                  </div>
               </div>
            </div>
         </div>
         <div className={styles.infoContainer}>
            {Boolean(latestParticipants.length) && (
               <div className={styles.outsideParticipantsContainer}>
                  <div className={styles.insideParticipantsContainer}>
                     {latestParticipants.map((p, i) => (
                        <div className={styles.participant} key={i}>
                           <p className={styles.participantLetter}>{p[0]}</p>
                        </div>
                     ))}
                  </div>
                  <div className={styles.participantsNumberContainer}>
                     <p className={styles.participantsNumber}>{participants.length}</p>
                  </div>
               </div>
            )} 
            {ban && <Link to={user?.user ? `/events/${_id}/join` : '/login'} className={`${styles.joinButton} ${styles.banButton}`}>Dołącz <IoIosArrowForward className={styles.joinIcon}/></Link>}
            {!ban && <Link to={user?.user ? `/events/${_id}/join` : '/login'} className={`${styles.joinButton} ${!join && styles.resignButton}`}>{join ? 'Dołącz' : 'Zrezygnuj'} {join && <IoIosArrowForward className={styles.joinIcon}/>}</Link>}
         </div>
      </div>
   )
}
 
export default EventCard