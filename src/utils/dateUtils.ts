export function getDaysInCurrentYearMonth(month : number) {
  const year = new Date().getFullYear();
  return new Date(year, month + 1, 0).getDate();
}
