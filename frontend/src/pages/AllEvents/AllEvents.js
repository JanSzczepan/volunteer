import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getAllEvents } from '../../redux/events'
import EventsInputButtonContainer from '../../components/EventsInputButtonContainer/EventsInputButtonContainer'
import EventCard from '../UpcomingEvents/EventCard/EventCard'
import styles from './AllEvents.module.scss'

const AllEvents = () => {

   const dispatch = useDispatch()
   const { isLoading, allEvents } = useSelector(store => store.events)

   const location = useLocation()

   useEffect(() => {
      dispatch(getAllEvents())
   }, [dispatch, location])

   return (  
      <section className={`section ${styles.allEventsSection}`}>
         <EventsInputButtonContainer />
         <div className={styles.headerContainer}>
            <h2 className={styles.header}>Wszystkie <br className={styles.headerBr}/> Wolontariaty</h2>
         </div>
         <div className='cardsContainer'>
            {Boolean(allEvents?.length) && allEvents.map((e, i) => (
               <EventCard event={e} isAllEvents={true} key={i}/>
            ))}
         </div>
      </section> 
   )
}
 
export default AllEvents