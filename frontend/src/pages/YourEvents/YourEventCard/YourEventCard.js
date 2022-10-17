import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { ImLocation2 } from 'react-icons/im'
import { BsClock } from 'react-icons/bs'

import returnDate from '../../../functions/returnDate'
import returnImage from '../../../functions/returnImage'
import styles from './YourEventCard.module.scss'

const YourEventCard = ({ event }) => {
   
   const { _id, title, city, date, selectedFile, cathegory } = event
   const { month, day } = returnDate(date)

   return (  
      <Link to={`/events/${_id}/eventDetails`} className={styles.card}>
         <div className={styles.cardImage} style={{backgroundImage:`url('${returnImage(selectedFile, cathegory)}')`}}/>
         <div className={styles.textContainer}>
            <h3 className={styles.cardHeaderText}>{title}</h3>
            <p className={styles.cardText}>
               <ImLocation2 className={styles.cardTextIcon}/>
               {city}
            </p>
            <p className={styles.cardText}>
               <BsClock className={styles.cardTextIcon}/>
               {day} {month}
            </p>
         </div>
         <div className={styles.iconContainer}>
            <IoIosArrowForward className={styles.icon}/>
         </div>
      </Link>
   )
}
 
export default YourEventCard