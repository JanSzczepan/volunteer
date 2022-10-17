import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { ImLocation2 } from 'react-icons/im'
import { BsClock } from 'react-icons/bs'

import returnDate from '../../../functions/returnDate'
import returnImage from '../../../functions/returnImage'
import styles from './YourEventCard.module.scss'

const YourEventCard = ({event, isArchival}) => {
   
   const { _id, title, city, date, selectedFile, cathegory } = event
   const { month, day } = returnDate(date)

   const returnCardContent = () => (
      <>
         <div className={styles.cardImage} style={{ backgroundImage: `url('${returnImage(selectedFile, cathegory)}')` }} />
         <div className={styles.textContainer}>
            <h3 className={styles.cardHeaderText}>{title}</h3>
            <p className={styles.cardText}>
               <ImLocation2 className={styles.cardTextIcon} />
               {city}
            </p>
            <p className={styles.cardText}>
               <BsClock className={styles.cardTextIcon} />
               {day} {month}
            </p>
         </div>
         {!isArchival && (
            <div className={styles.iconContainer}>
               <IoIosArrowForward className={styles.icon} />
            </div>
         )}
      </>
   )
   
   return (  
      <>
         {!isArchival && (
            <Link to={`/events/${_id}/eventDetails`} className={styles.card}>
               {returnCardContent()}
            </Link>
         )}
         {isArchival && (
            <div className={styles.card}>
               {returnCardContent()}
            </div>
         )}
      </>
   )
}
 
export default YourEventCard