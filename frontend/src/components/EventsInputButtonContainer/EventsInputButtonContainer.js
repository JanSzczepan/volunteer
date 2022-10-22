import { Link } from 'react-router-dom'

import Search from '../Search/Search'
import styles from './EventsInputButtonContainer.module.scss'

const EventsInputButtonContainer = () => {
   return (  
      <div className={styles.inputButtonContainer}>
         <Search />
         <Link to='/volunteer/events/add-event' className={styles.addEventButton}>Dodaj Event</Link>
      </div>
   )
}
 
export default EventsInputButtonContainer