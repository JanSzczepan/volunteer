import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { FaHouseUser, FaUserCheck } from 'react-icons/fa'

import returnImage from '../../functions/returnImage'
import returnDate from '../../functions/returnDate'
import { getEvent } from '../../redux/events'
import PageNotFound from '../PageNotFound/PageNotFound'
import styles from './EventDetails.module.scss'
import Loader from '../../components/Loader/Loader'
import { COLORS } from '../../constants'
import { useAppSelector } from '../../hooks/useTypedSelector'
import { useAppDispatch } from '../../hooks/useTypedDispatch'
import useLocalStorage from '../../hooks/useLocalStorage'
import { UserProfile } from '../../App'

const EventDetails = () => {
   const [user] = useLocalStorage<UserProfile>('profile', {})

   const dispatch = useAppDispatch()
   const { event, isLoading, error } = useAppSelector((store) => store.events)

   const { id } = useParams()

   useEffect(() => {
      dispatch(getEvent(id || ''))
   }, [id, dispatch])

   if (error === 'Event id is not valid') return <PageNotFound />

   if (!event || isLoading)
      return (
         <div className='loaderSpinnerBigContainer'>
            <Loader
               height={40}
               width={40}
               color={COLORS.green}
               secondaryColor={COLORS.green}
               strokeWidth={3}
               strokeWidthSecondary={3}
            />
         </div>
      )

   const { month, day, hours, minutes } = returnDate(event.date!)
   const latestParticipants = event.participantsNames?.slice(-3)

   const join = Boolean(!event.participants?.includes(user?.user?._id!))
   const ban = Boolean(event.banned?.includes(user?.user?._id!))
   const isAuthor = Boolean(event.creator === user?.user?._id)

   const handleParticipantsText = (participantsNum: number) => {
      if (!participantsNum) return
      else if (participantsNum === 1) return `${participantsNum} osoba dołączyła`
      else if (participantsNum === 2 || participantsNum === 3 || participantsNum === 4) return `${participantsNum} osoby dołączyły`
      else return `${participantsNum} osób dołączyło`
   }

   const participantsText = handleParticipantsText(event.participants?.length!)

   return (
      <section className={`section ${styles.eventDetailsSection}`}>
         <div className={styles.headerContainer}>
            <h2 className={styles.headerText}>Szczegóły Eventu</h2>
         </div>
         <header className={styles.eventDetailsHeader}>
            <div
               className={styles.imageContainer}
               style={{ backgroundImage: `url('${returnImage(event.selectedFile, event.cathegory)}')` }}
            />
            <div className={styles.outsideTextContainer}>
               <div className={styles.insideTextContainer}>
                  <h1 className={styles.eventTitle}>{event.title}</h1>
                  <p className={styles.eventDate}>
                     {day} {month} <span className={styles.eventDateDot}>&#8226;</span> {hours}:{minutes}
                  </p>
               </div>
               {isAuthor && (
                  <div className={styles.authorContainer}>
                     <FaHouseUser className={styles.authorIcon} />
                     <p className={styles.authorText}>Jesteś autorem tego eventu</p>
                  </div>
               )}
               {!isAuthor && (
                  <>
                     {ban && (
                        <Link
                           to={user?.user ? `/volunteer/events/${event._id}/join` : '/volunteer/login'}
                           className={`${styles.joinButton} ${styles.banButton}`}
                        >
                           Dołącz <IoIosArrowForward className={styles.joinIcon} />
                        </Link>
                     )}
                     {!ban && join && (
                        <Link
                           to={user?.user ? `/volunteer/events/${event._id}/join` : '/volunteer/login'}
                           className={styles.joinButton}
                        >
                           Dołącz <IoIosArrowForward className={styles.joinIcon} />
                        </Link>
                     )}
                     {!ban && !join && (
                        <div className={styles.joinContainer}>
                           <FaUserCheck className={styles.joinIcon} />
                           <p className={styles.joinText}>Jesteś uczestnikiem tego eventu</p>
                        </div>
                     )}
                  </>
               )}
               <h5 className={styles.eventDescriptionHeader}>Opis:</h5>
               <p className={styles.eventDescription}>{event.description}</p>
               {Boolean(event.participants?.length) && (
                  <div className={styles.outsideParticipantsContainer}>
                     <p className={styles.participantsHeader}>
                        {participantsText}
                        <span className={styles.participantsSpan}>:</span>
                     </p>
                     <div className={styles.insideParticipantsContainer}>
                        {latestParticipants?.map((p, i) => (
                           <div
                              className={styles.participant}
                              key={i}
                           >
                              <p className={styles.participantLetter}>{p[0]}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
               {!isAuthor && !ban && !join && (
                  <Link
                     to={user?.user ? `/volunteer/events/${event._id}/join` : '/volunteer/login'}
                     className={`${styles.joinButton} ${styles.resignButton}`}
                  >
                     Zrezygnuj
                  </Link>
               )}
            </div>
         </header>
      </section>
   )
}

export default EventDetails
