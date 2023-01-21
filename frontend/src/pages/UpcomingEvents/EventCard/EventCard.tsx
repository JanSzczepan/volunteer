import { Link } from 'react-router-dom'
import { ImLocation2 } from 'react-icons/im'
import { FaHouseUser, FaUserCheck } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { BsClock } from 'react-icons/bs'

import styles from './EventCard.module.scss'
import returnImage from '../../../functions/returnImage'
import returnDate from '../../../functions/returnDate'
import CathegoryIcon from '../../../components/CathegoryIcon/CathegoryIcon'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { Event } from '../../../redux/events'
import { UserProfile } from '../../../App'

type EventCardProps = {
   event: Event
   isAllEvents?: boolean
}

const EventCard = ({ event, isAllEvents = false }: EventCardProps) => {
   const [user] = useLocalStorage<UserProfile>('profile', {})

   const { _id, title, date, cathegory, city, selectedFile, participants, participantsNames, banned, creator } = event

   const { monthNumber, day, hours, minutes } = returnDate(date!)
   const latestParticipants = participantsNames?.slice(-3)

   const join = Boolean(!participants?.includes(user?.user?._id!))
   const ban = Boolean(banned?.includes(user?.user?._id!))
   const isAuthor = Boolean(creator === user?.user?._id)

   return (
      <div className={styles.card}>
         <Link to={`/volunteer/events/${_id}/eventDetails`}>
            <div
               className={styles.imageContainer}
               style={{ backgroundImage: `url('${returnImage(selectedFile, cathegory)}')` }}
            >
               <div className={styles.frontContainer}>
                  <div className={styles.textContainer}>
                     <h3 className={styles.title}>{title}</h3>
                     <h4 className={styles.location}>
                        <ImLocation2 className={styles.locationIcon} />
                        {city}
                     </h4>
                     <p className={styles.time}>
                        <BsClock className={styles.clockIcon} />
                        {isAllEvents && (
                           <>
                              {day}.{monthNumber}
                              <span className={styles.timeDot}>&#8226;</span>
                           </>
                        )}
                        {hours}:{minutes}
                     </p>
                  </div>
                  <div className={styles.outsideIconContainer}>
                     <div className={styles.insideIconContainer}>
                        <CathegoryIcon
                           cathegory={cathegory}
                           className={'cathegoryIconCard'}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </Link>
         <div className={styles.infoContainer}>
            {Boolean(latestParticipants?.length) && (
               <div className={styles.outsideParticipantsContainer}>
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
                  <div className={styles.participantsNumberContainer}>
                     <p className={styles.participantsNumber}>{participants?.length}</p>
                  </div>
               </div>
            )}
            {isAuthor && (
               <div className={styles.authorContainer}>
                  <FaHouseUser className={styles.authorIcon} />
                  <p className={styles.authorText}>Autor</p>
               </div>
            )}
            {!isAuthor && (
               <>
                  {ban && (
                     <Link
                        to={user?.user ? `/volunteer/events/${_id}/join` : '/volunteer/login'}
                        className={`${styles.joinButton} ${styles.banButton}`}
                     >
                        Dołącz <IoIosArrowForward className={styles.joinIcon} />
                     </Link>
                  )}
                  {!ban && !join && (
                     <>
                        <div className={styles.joinContainer}>
                           <FaUserCheck className={styles.joinIcon} />
                           <p className={styles.joinText}>Uczestnik</p>
                        </div>
                     </>
                  )}
                  {!ban && join && (
                     <Link
                        to={user?.user ? `/volunteer/events/${_id}/join` : '/volunteer/login'}
                        className={styles.joinButton}
                     >
                        Dołącz <IoIosArrowForward className={styles.joinIcon} />
                     </Link>
                  )}
               </>
            )}
         </div>
      </div>
   )
}

export default EventCard
