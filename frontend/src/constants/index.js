import { FaDog, FaHandsHelping, FaHospital } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import { BiPackage } from 'react-icons/bi'
import { GiMoneyStack, GiSlicedBread, GiPartyPopper } from 'react-icons/gi'
import { MdChildFriendly, MdLocalHospital } from 'react-icons/md'
import { VscOrganization } from 'react-icons/vsc'

export const OPTIONS = [
   { value: 'Pomoc finansowa', text: 'Pomoc finansowa', imgLink: 'https://woiz.p.lodz.pl/arch/wp-content/uploads/2020/07/pomoc-materialna-i-stypendia.jpeg', icon: GiMoneyStack },
   { value: 'Pomoc materialna', text: 'Pomoc materialna', imgLink: 'https://images.squarespace-cdn.com/content/v1/5fc85c0aedf9c235eae18004/1642641112725-QGYNG8YR4ADZYEVM9J9K/Rouba_001+copy.jpg?format=1500w', icon: GiSlicedBread },
   { value: 'Pomoc zwierzętom', text: 'Pomoc zwierzętom', imgLink: 'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2019/10/1200/675/iStock-992637094.jpg?ve=1&tl=1', icon: FaDog },
   { value: 'Pomoc osobom starszym', text: 'Pomoc osobom starszym', imgLink: 'https://sonnethill.com/wp-content/uploads/2020/03/elderly-care-facilities.jpeg', icon: FaHandsHelping },
   { value: 'Pomoc dzieciom', text: 'Pomoc dzieciom', imgLink: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i4emrPpnUrgc/v0/1200x-1.jpg', icon: MdChildFriendly },
   { value: 'Pomoc w szpitalu', text: 'Pomoc w szpitalu', imgLink: 'https://s3.amazonaws.com/utep-uploads/wp-content/uploads/online-regis-college/2018/03/09141042/RC-MSHA-Patient-Safety.jpg', icon: MdLocalHospital },
   { value: 'Pomoc w hospicjum', text: 'Pomoc w hospicjum', imgLink: 'https://as2.ftcdn.net/v2/jpg/01/84/89/93/1000_F_184899344_ih8balLtwB31dsWq8FNDBISXoEzZT8a2.jpg', icon: FaHospital },
   { value: 'Organizacja wydarzenia', text: 'Organizacja wydarzenia', imgLink: 'https://marqueemonkeys.com.au/wp-content/uploads/2019/02/marquee-monkeys-2-980x523.jpg', icon: GiPartyPopper },
   { value: 'Fundacja', text: 'Fundacja', imgLink: 'https://finka.pl/images/2018/11/12/ngo_fv3_resize.jpg', icon: AiFillHeart },
   { value: 'Stowarzyszenie', text: 'Stowarzyszenie', imgLink: 'https://lawyerline.pl/wp-content/uploads/elementor/thumbs/zalozenie-stowarzyszenia-fundacja-pn0tg8h9eq8ybrdbezd9kd84r4vizpiqw2injwrw68.jpg', icon: VscOrganization },
   { value: 'Zbiórka', text: 'Zbiórka', imgLink: 'https://www.thelifeyoucansave.org/wp-content/uploads/2019/11/Screen-Shot-2015-07-13-at-1.53.34-PM.png', icon: BiPackage },
]