import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import EventCard from './EventCard/EventCard'
import { getUpcomingEvents } from '../../redux/events'
import EventsInputButtonContainer from '../../components/EventsInputButtonContainer/EventsInputButtonContainer'
import styles from './UpcomingEvents.module.scss'
import Loader from '../../components/Loader/Loader'
import { COLORS } from '../../constants'

const UpcomingEvents = () => {
   const [isToday, setIsToday] = useState(true)

   const dispatch = useDispatch()
   const { isLoading, todayEvents, tomorrowEvents } = useSelector((store) => store.events)

   useEffect(() => {
      dispatch(getUpcomingEvents())
   }, [dispatch])

   return (
      <section className={`section ${styles.upcomingEventsSection}`}>
         <EventsInputButtonContainer />
         <div className={styles.headerButtonContainer}>
            <h2 className={styles.header}>
               Nadchodzące <br className={styles.headerBr} /> Wolontariaty
            </h2>
            <Link
               to='/volunteer/events/all'
               className={styles.viewAllButton}
            >
               Wszystkie
            </Link>
         </div>
         <div className={styles.buttonsContainer}>
            <button
               className={`${styles.dayButton} ${isToday && styles.dayButtonActive}`}
               onClick={() => setIsToday(true)}
               type='button'
            >
               Dziś
            </button>
            <button
               className={`${styles.dayButton} ${!isToday && styles.dayButtonActive}`}
               onClick={() => setIsToday(false)}
               type='button'
            >
               Jutro
            </button>
         </div>
         {isLoading ? (
            <div className='loaderSpinnerContainer'>
               <Loader
                  height={40}
                  width={40}
                  color={COLORS.green}
                  secondaryColor={COLORS.green}
                  strokeWidth={3}
                  strokeWidthSecondary={3}
               />
            </div>
         ) : (
            <div className='cardsContainer'>
               {!isLoading &&
                  isToday &&
                  Boolean(todayEvents?.length) &&
                  todayEvents.map((e, i) => (
                     <EventCard
                        event={e}
                        key={i}
                     />
                  ))}
               {!isLoading && isToday && Boolean(!todayEvents?.length) && (
                  <div>
                     <p>Nie ma dzisiaj żadnych eventów</p>
                  </div>
               )}
               {!isLoading &&
                  !isToday &&
                  Boolean(tomorrowEvents?.length) &&
                  tomorrowEvents.map((e, i) => (
                     <EventCard
                        event={e}
                        key={i}
                     />
                  ))}
               {!isLoading && !isToday && Boolean(!tomorrowEvents?.length) && (
                  <div>
                     <p>Nie ma jutro żadnych eventów</p>
                  </div>
               )}
            </div>
         )}
      </section>
   )
}

export default UpcomingEvents
