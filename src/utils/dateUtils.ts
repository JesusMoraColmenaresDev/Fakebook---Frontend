import { useState } from "react";

export const getDaysMount = (daysMountNumber : number) =>  Array.from({length :daysMountNumber}, (_, index) => index + 1)
const currentYear = new Date().getFullYear()
export const GetYears = () => Array.from({length : 100}, (_,index) => currentYear - index)

export function getDaysInCurrentYearMonth(month : number) {
  const year = new Date().getFullYear();
  return new Date(year, month + 1, 0).getDate();
}

