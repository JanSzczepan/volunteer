import { ImLocation2 } from 'react-icons/im'
import { FaDog } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { BsClock } from 'react-icons/bs'

import styles from './EventCard.module.scss'

const EventCard = ({ event }) => {
   
   const { title, date, cathegory, city, selectedFile, participants } = event
   const hours = (new Date(date)).getHours()
   const minutes = (new Date(date)).getMinutes()
   const latestParticipants = participants.slice(-3)
   
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
            <button className={styles.joinButton}>Dołącz <IoIosArrowForward className={styles.joinIcon}/></button>
         </div>
      </div>
   )
}
 
export default EventCard