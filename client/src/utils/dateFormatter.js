function dateToString(date)
{
  let newDate = new Date(date)
  let year = newDate.getFullYear()
  let month = newDate.toLocaleString('ro-RO', {month: 'long'})
  let monthFirstLetter = month.charAt(0).toUpperCase()
  let monthRestLetters = month.slice(1)
  month = monthFirstLetter + monthRestLetters
  let day = newDate.getDate()

  return day + " " + month + " " + year

}

export default dateToString;