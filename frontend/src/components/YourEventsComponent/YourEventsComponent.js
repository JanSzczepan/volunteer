import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getYourEvents } from '../../redux/events'
import YourEventCard from './YourEventCard/YourEventCard'
import styles from './YourEventsComponent.module.scss'

const YourEventsComponent = ({ isArchival }) => {
   
   const dispatch = useDispatch()
   const { authorEvents, participantEvents, authorArchivalEvents, participantArchivalEvents, isLoading } = useSelector(store => store.events)

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
               <h2 className={styles.eventHeaderText}>{isArchival ? 'Archiwalne wolontariaty, których' : 'Wolontariaty, których'} <br className={styles.eventBr}/> {isArchival ? 'byłeś' : 'jesteś'} autorem:</h2>
               {!isArchival && (
                  <>
                  {Boolean(authorEvents?.length) && (
                     authorEvents.map((event, i) => (
                        <YourEventCard event={event} isArchival={isArchival} key={i}/>
                     ))
                  )}
                  {Boolean(!authorEvents?.length) && (
                     <div>
                        <p className={styles.noEventText}>Nie jesteś autorem żadnego wolontariatu...</p>
                        <Link to='/volunteer/events/add-event' className={styles.addEventButton}>Dodaj</Link>
                     </div>
                  )}
                  </>
               )}
               {isArchival && (
                  <>
                  {Boolean(authorArchivalEvents?.length) && (
                     authorArchivalEvents.map((event, i) => (
                        <YourEventCard event={event} isArchival={isArchival} key={i}/>
                     ))
                  )}
                  {Boolean(!authorArchivalEvents?.length) && (
                     <div>
                        <p className={styles.noEventText}>Nie jesteś autorem żadnego archiwalnego wolontariatu...</p>
                     </div>
                  )}
                  </>
               )}
            </div>
            <div className={styles.eventsContainer}>
               <h2 className={styles.eventHeaderText}>{isArchival ? 'Archiwalne wolontariaty' : 'Wolontariaty'}, w których <br className={styles.eventBr}/> {isArchival ? 'brałeś' : 'bierzesz'} udział:</h2>
               {!isArchival && (
                  <>
                  {Boolean(participantEvents?.length) && (
                     participantEvents.map((event, i) => (
                        <YourEventCard event={event} isArchival={isArchival} key={i}/>
                     ))
                  )}
                  {Boolean(!participantEvents?.length) && (
                     <div>
                        <p className={styles.noEventText}>Nie jesteś uczestnikiem żadnego wolontariatu...</p>
                        <Link to='/volunteer/events/all' className={`${styles.addEventButton} ${styles.exploreButton}`}>Przeglądaj</Link>
                     </div>
                  )}
                  </>
               )}
               {isArchival && (
                  <>
                  {Boolean(participantArchivalEvents?.length) && (
                     participantArchivalEvents.map((event, i) => (
                        <YourEventCard event={event} isArchival={isArchival} key={i}/>
                     ))
                  )}
                  {Boolean(!participantArchivalEvents?.length) && (
                     <div>
                        <p className={styles.noEventText}>Nie jesteś uczestnikiem żadnego archiwalnego wolontariatu...</p>
                     </div>
                  )}
                  </>
               )}
            </div>
         </div>
      </section>
   )
}
 
export default YourEventsComponent