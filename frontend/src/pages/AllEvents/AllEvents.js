import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllEvents } from '../../redux/events'
import EventsInputButtonContainer from '../../components/EventsInputButtonContainer/EventsInputButtonContainer'
import EventCard from '../UpcomingEvents/EventCard/EventCard'
import styles from './AllEvents.module.scss'

const AllEvents = () => {

   const dispatch = useDispatch()
   const { isLoading, events } = useSelector(store => store.events)

   useEffect(() => {
      dispatch(getAllEvents())
   }, [dispatch])
   
   // if (isLoading) return

   return (  
      <section className={`section ${styles.allEventsSection}`}>
         <EventsInputButtonContainer />
         <div className={styles.headerContainer}>
            <h2 className={styles.header}>Wszystkie <br className={styles.headerBr}/> Eventy</h2>
         </div>
         <div className='cardsContainer'>
            {Boolean(events.length) && events.map((e, i) => (
               <EventCard event={e} key={i}/>
            ))}
         </div>
      </section> 
   )
}
 
export default AllEvents