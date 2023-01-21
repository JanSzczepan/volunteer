import Image from '../../../images/about_2.jpg'
import styles from './AboutP3.module.scss'

type VolunteerReason = {
   header: string
}

const VOLUNTEER_REASONS_LIST: VolunteerReason[] = [{ header: 'Doświadczenie i umiejętności' }, { header: 'Możliwość poznania branży' }, { header: 'Ciekawe znajomości' }, { header: 'Nauka empatii i wdzięczności' }, { header: 'Wpływ na świat wokół siebie' }]

const AboutP3 = () => {
   return (
      <section className={`section ${styles.aboutSection}`}>
         <div className={styles.aboutContainer}>
            <div>
               <h2 className={styles.headerText}>Dlaczego warto zostać wolontariuszem?</h2>
               {VOLUNTEER_REASONS_LIST.map((item, i) => (
                  <div
                     className={styles.reasonContainer}
                     key={i}
                  >
                     <div className={styles.reasonNumberContainer}>
                        <p className={styles.reasonNumberText}>{i + 1}</p>
                     </div>
                     <div className={styles.reasonTextContainer}>
                        <h4 className={styles.reasonHeaderText}>{item.header}</h4>
                     </div>
                  </div>
               ))}
            </div>
            <img
               className={styles.image}
               src={Image}
               alt='Wolontariusze'
            />
         </div>
      </section>
   )
}

export default AboutP3
