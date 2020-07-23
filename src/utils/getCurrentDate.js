export default function getCurrentDate() {
  const currDay = new Date().getDate();
  const currMonth = new Date().getMonth() + 1;
  const currYear = new Date().getFullYear();

  return `${currDay}/${currMonth}/${currYear}`;
}
