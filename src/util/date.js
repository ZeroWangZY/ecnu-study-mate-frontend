export const jsDateToCalendarDate = date => {
  let year = date.getFullYear();
  let month = addZeroIfLessThanTen(date.getMonth());
  let day = addZeroIfLessThanTen(date.getDate());
  let hour = addZeroIfLessThanTen(date.getHours());
  let minute = addZeroIfLessThanTen(date.getMinutes());
  return year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
}

const addZeroIfLessThanTen = value => {
  return value < 10
    ? '0' + value
    : value;
}