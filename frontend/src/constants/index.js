import { FaDog, FaHandsHelping, FaHospital } from 'react-icons/fa'
import { BiPackage } from 'react-icons/bi'
import { GiMoneyStack, GiSlicedBread, GiPartyPopper } from 'react-icons/gi'
import { MdChildFriendly, MdLocalHospital } from 'react-icons/md'

export const OPTIONS = [
   { value: 'Pomoc finansowa', text: 'Pomoc finansowa', imgLink: 'https://woiz.p.lodz.pl/arch/wp-content/uploads/2020/07/pomoc-materialna-i-stypendia.jpeg', icon: GiMoneyStack, description: 'W życiu spotykamy ludzi, dla których los był nieprzychylny. Niektórzy mają problemy, z którymi nie potrafią sobie poradzić. Wspomóż finansowo tych, którzy nie mieli tyle szczęścia co ty.' },
   { value: 'Pomoc materialna', text: 'Pomoc materialna', imgLink: 'https://images.squarespace-cdn.com/content/v1/5fc85c0aedf9c235eae18004/1642641112725-QGYNG8YR4ADZYEVM9J9K/Rouba_001+copy.jpg?format=1500w', icon: GiSlicedBread, description: 'Pomoc materialna może usczęśliwić wiele osób i dzieci. Rzeczy, które tobie są niepotrzebne, lecz w dobrym stanie mogą innym się bardzo przydać, rozwiązać podstawowe problemy i dać wiele radości.' },
   { value: 'Pomoc zwierzętom', text: 'Pomoc zwierzętom', imgLink: 'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2019/10/1200/675/iStock-992637094.jpg?ve=1&tl=1', icon: FaDog, description: 'Zwierzęta również potrzebują naszej pomocy. Wiele z nich jest samotnych lub opuszczonych. Zobacz jak możesz im pomóc, ich los niejednokrotnie leży w twoich rękach.' },
   { value: 'Pomoc osobom starszym', text: 'Pomoc osobom starszym', imgLink: 'https://sonnethill.com/wp-content/uploads/2020/03/elderly-care-facilities.jpeg', icon: FaHandsHelping, description: 'Starsze osoby potrzebują opieki, czasem dobrego słowa i uśmiechu. Też będziesz kiedyś starszy i również możesz potrzebować pomocy. Dając tak niewiele możesz innym dać bardzo dużo.' },
   { value: 'Pomoc dzieciom', text: 'Pomoc dzieciom', imgLink: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i4emrPpnUrgc/v0/1200x-1.jpg', icon: MdChildFriendly, description: 'Wokół nas jest wiele dzieci, które nie mają rodzin. Pomóż im spełnić marzenia. Organizuj lub uczestnicz w wolontariatach w domach dziecka, dasz im uśmiech i wiarę w ludzi.' },
   { value: 'Pomoc w szpitalu', text: 'Pomoc w szpitalu', imgLink: 'https://s3.amazonaws.com/utep-uploads/wp-content/uploads/online-regis-college/2018/03/09141042/RC-MSHA-Patient-Safety.jpg', icon: MdLocalHospital, description: 'Szpital to miejsce, które kojarzy się z chorobą i cierpieniem. Oprócz opieki medycznej, potrzebna jest zwykła ludzka życzliwość i pomoc w organizowaniu podstawowych  potrzeb życiowych.' },
   { value: 'Pomoc w hospicjum', text: 'Pomoc w hospicjum', imgLink: 'https://as2.ftcdn.net/v2/jpg/01/84/89/93/1000_F_184899344_ih8balLtwB31dsWq8FNDBISXoEzZT8a2.jpg', icon: FaHospital, description: 'Pobyt w hospicjum może być najtrudniejszym okresem w życiu człowieka. Dodaj nadzieji tym których opuściła rodzina lub nie ma czasu się nimy opiekować.' },
   { value: 'Organizacja wydarzenia', text: 'Organizacja wydarzenia', imgLink: 'https://marqueemonkeys.com.au/wp-content/uploads/2019/02/marquee-monkeys-2-980x523.jpg', icon: GiPartyPopper, description: 'Organizowanie charytatywnych wydarzeń w twoim regionie to pomysł na integrację i miło spędzony czas. Będąc uczestnikiem wspierasz szczytne cele.' },
   { value: 'Zbiórka', text: 'Zbiórka', imgLink: 'https://www.thelifeyoucansave.org/wp-content/uploads/2019/11/Screen-Shot-2015-07-13-at-1.53.34-PM.png', icon: BiPackage, description: 'Zbiórka pieniędzy jest najprostrzym sposobem, warto jednak powrócić do zapomnianych form zbiórek np. makulatury, zakrętek, baterii itp. Przy okazji pomagając naszej planecie możesz pomóc innym.' },
]

export const COLORS = {
   white: '#fff',
   gray: '#C3C3C3',
   purple: '#6064CA',
   green: '#74D189',
}
