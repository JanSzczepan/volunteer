import { Option } from '../../constants'
import { CardItem } from '../../pages/About/AboutP2/AboutP2'
import styles from './AboutCard.module.scss'

type AboutCardProps = {
   card: CardItem | Option
}

const AboutCard = ({ card }: AboutCardProps) => {
   const CardIcon = <card.icon className={styles.cardIcon} />

   return (
      <>
         <div className={styles.cardIconContainer}>{CardIcon}</div>
         <h5 className={styles.cardHeaderText}>{card.text}</h5>
         <p className={styles.cardText}>{card.description}</p>
      </>
   )
}

export default AboutCard
