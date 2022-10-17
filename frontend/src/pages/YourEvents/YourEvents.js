import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getYourEvents } from '../../redux/events'
import YourEventCard from './YourEventCard/YourEventCard'
import styles from './YourEvents.module.scss'

const YourEvents = () => {
   
   const dispatch = useDispatch()
   const { authorEvents, participantEvents, isLoading } = useSelector(store => store.events)

   const user = JSON.parse(window.localStorage.getItem('profile'))

   useEffect(() => {
      if (user?.user)
         dispatch(getYourEvents())
   }, [dispatch])
   
   if (isLoading) return

   return (
      <section className={`section ${styles.yourEventsSection}`}>
         <div className={styles.outsideEventsContainer}>
            <div className={styles.eventsContainer}>
               <h2 className={styles.eventHeaderText}>Wolontariaty, których <br className={styles.eventBr}/> jesteś autorem:</h2>
               {Boolean(authorEvents?.length) && (
                  authorEvents.map((event, i) => (
                     <YourEventCard event={event} key={i}/>
                  ))
               )}
               {Boolean(!authorEvents?.length) && (
                  <div>
                     <p className={styles.noEventText}>Nie jesteś autorem żadnego wolontariatu...</p>
                     <Link to='/events/add-event' className={styles.addEventButton}>Dodaj</Link>
                  </div>
               )}
            </div>
            <div className={styles.eventsContainer}>
               <h2 className={styles.eventHeaderText}>Wolontariaty, w których <br className={styles.eventBr}/> bierzesz udział:</h2>
               {Boolean(participantEvents?.length) && (
                  participantEvents.map((event, i) => (
                     <YourEventCard event={event} key={i}/>
                  ))
               )}
               {Boolean(!participantEvents?.length) && (
                  <div>
                     <p className={styles.noEventText}>Nie jesteś uczestnikiem żadnego wolontariatu...</p>
                     <Link to='/events/all' className={`${styles.addEventButton} ${styles.exploreButton}`}>Przeglądaj</Link>
                  </div>
               )}
            </div>
         </div>
      </section>
   )
}
 
export default YourEvents