const returnDate = (date: string) => {
   if (!date) return {}

   const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
   let monthNumber = (new Date(date).getUTCMonth() + 1).toString()
   const month = months[Number(monthNumber) - 1]
   let day = new Date(date).getUTCDate().toString()
   let hours = new Date(date).getUTCHours().toString()
   let minutes = new Date(date).getUTCMinutes().toString()

   if (Number(monthNumber) < 10) monthNumber = '0' + monthNumber
   if (Number(day) < 10) day = '0' + day
   if (Number(hours) < 10) hours = '0' + hours
   if (Number(minutes) < 10) minutes = '0' + minutes

   return {
      monthNumber,
      month,
      day,
      hours,
      minutes,
   }
}

export default returnDate
