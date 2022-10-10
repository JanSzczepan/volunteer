import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Search from '../../components/Search/Search'
import EventCard from './EventCard/EventCard'
import { getUpcomingEvents } from '../../redux/events'
import styles from './UpcomingEvents.module.scss'

const UpcomingEvents = () => {

   const [isToday, setIsToday] = useState(true)

   const dispatch = useDispatch()
   const { isLoading, events } = useSelector(store => store.events)

   useEffect(() => {
      dispatch(getUpcomingEvents())
   }, [dispatch])

   if (isLoading) return
  
   return (  
      <section className={styles.section}>
         <div className={styles.inputButtonContainer}>
            <Search />
            <Link to='/events/add-event' className={styles.addEventButton}>Dodaj Event</Link>
         </div>
         <div className={styles.headerButtonContainer}>
            <h2 className={styles.header}>Nadchodzące <br className={styles.headerBr}/> Eventy</h2>
            <Link to='/events/all' className={styles.viewAllButton}>View all</Link>
         </div>
         <div className={styles.buttonsContainer}>
            <button className={`${styles.dayButton} ${isToday && styles.dayButtonActive}`} onClick={() => setIsToday(true)} type='button'>Today</button>
            <button className={`${styles.dayButton} ${!isToday && styles.dayButtonActive}`} onClick={() => setIsToday(false)} type='button'>Tomorrow</button>
         </div>
         <div className={styles.cardsContainer}>
            {isToday && Boolean(events.todayEvents.length) && ( 
               events.todayEvents.map((e, i) => (
                  <EventCard event={e} key={i}/>
               ))
            )}
            {isToday && Boolean(!events.todayEvents.length) && (
               <div>
                  <p>Nie ma dzisiaj żadnych eventów</p>
               </div>
            )}
            {!isToday && Boolean(events.tomorrowEvents.length) && (
               events.tomorrowEvents.map((e, i) => (
                  <EventCard event={e} key={i}/>
               ))
            )}
            {!isToday && Boolean(!events.tomorrowEvents.length) && (
               <div>
                  <p>Nie ma jutro żadnych eventów</p>
               </div>
            )}
         </div>
      </section>
   )
}
 
export default UpcomingEvents