const returnDate = (date) => {
   if (!date) return {}

   const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
   const monthNumber = new Date(date).getUTCMonth() + 1
   const month = months[monthNumber - 1]
   const day = new Date(date).getUTCDate()
   let hours = new Date(date).getUTCHours()
   let minutes = new Date(date).getUTCMinutes()

   if (hours < 10) hours = '0' + hours
   if (minutes < 10) minutes = '0' + minutes

   return {
      monthNumber,
      month,
      day,
      hours,
      minutes,
   }
}

export default returnDate
