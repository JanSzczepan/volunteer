import styles from './AboutCard.module.scss'

const AboutCard = ({ card }) => {
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
