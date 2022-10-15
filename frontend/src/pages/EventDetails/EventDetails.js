import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowForward } from 'react-icons/io'
import { FaHouseUser } from 'react-icons/fa'

import { getEvent } from '../../redux/events'
import styles from './EventDetails.module.scss'

const EventDetails = () => {

   const dispatch = useDispatch()
   const { event, isLoading } = useSelector(store => store.events)

   const { id } = useParams()

   useEffect(() => {
      dispatch(getEvent(id))
   }, [id])

   if (!event) return null

   const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
   const month = months[(new Date(event.date)).getMonth()]
   const day = (new Date(event.date)).getDay()
   const hours = (new Date(event.date)).getHours()
   const minutes = (new Date(event.date)).getMinutes()
   const latestParticipants = event.participantsNames.slice(-3)

   const user = JSON.parse(window.localStorage.getItem('profile'))
   
   const join = Boolean(!event.participants.includes(user?.user._id))
   const ban = Boolean(event.banned.includes(user?.user._id))
   const isAuthor = Boolean(event.creator === user?.user._id)

   const handleParticipantsText = (participantsNum) => {
      if (!participantsNum) 
         return
      else if (participantsNum == 1)
         return `${participantsNum} osoba dołączyła`
      else if (participantsNum == 2 || participantsNum == 3 || participantsNum == 4)
         return `${participantsNum} osoby dołączyły`
      else 
         return `${participantsNum} osób dołączyło`      
   }

   const participantsText = handleParticipantsText(event.participants.length)

   return (  
      <section className={`section ${styles.eventDetailsSection}`}>
         <div className={styles.headerContainer}>
            <h2 className={styles.headerText}>Szczegóły Eventu</h2>
         </div>
         <header className={styles.eventDetailsHeader}>
            <div className={styles.imageContainer} style={event.selectedFile && {backgroundImage:`url('${event.selectedFile}')`}}/>
            <div className={styles.outsideTextContainer}>
               <div className={styles.insideTextContainer}>
                  <h1 className={styles.eventTitle}>{event.title}</h1>
                  <p className={styles.eventDate}>{day} {month} <span className={styles.eventDateDot}>&#8226;</span> {hours}:{minutes}</p>
               </div>
               {isAuthor && (
                  <div className={styles.authorContainer}>
                     <FaHouseUser className={styles.authorIcon}/>
                     <p className={styles.authorText}>Jesteś autorem tego eventu</p>
                  </div>
               )}
               {!isAuthor && (
                  <>
                  {ban && <Link to={user?.user ? `/events/${event._id}/join` : '/login'} className={`${styles.joinButton} ${styles.banButton}`}>Dołącz <IoIosArrowForward className={styles.joinIcon}/></Link>}
                  {!ban && <Link to={user?.user ? `/events/${event._id}/join` : '/login'} className={`${styles.joinButton} ${!join && styles.resignButton}`}>{join ? 'Dołącz' : 'Zrezygnuj'} {join && <IoIosArrowForward className={styles.joinIcon}/>}</Link>}
                  </>
               )}
               <h5 className={styles.eventDescriptionHeader}>Opis:</h5>
               <p className={styles.eventDescription}>{event.description}</p>
               {Boolean(event.participants.length) && (
                  <div className={styles.outsideParticipantsContainer}>
                     <p className={styles.participantsHeader}>{participantsText}<span className={styles.participantsSpan}>:</span></p>
                     <div className={styles.insideParticipantsContainer}>
                        {latestParticipants.map((p, i) => (
                           <div className={styles.participant} key={i}>
                              <p className={styles.participantLetter}>{p[0]}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </header>
      </section>
   )
}
 
export default EventDetails