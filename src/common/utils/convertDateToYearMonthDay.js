const convertDateToYearMonthDay = (dayMonthYear) => {
  const splitDate = dayMonthYear.split("/");
  const today = new Date(splitDate[2], splitDate[1], splitDate[0]);
  const yyyy = today.getFullYear();
  let mm = today.getMonth();
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = yyyy + "-" + mm + "-" + dd;

  return formattedToday;
};

export default convertDateToYearMonthDay;
