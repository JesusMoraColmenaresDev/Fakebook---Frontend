import { set, useForm } from "react-hook-form"
import { getDaysInCurrentYearMonth } from "../../utils/dateUtils"
import { useEffect, useState } from "react"

const arrayMonths = [
  "January",
  "February",
  "March",
  "April",
  "May" ,
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

function RegisterView() {

  const {register, handleSubmit, reset, formState: {errors}} = useForm()
  const [daysMountNumber, setDaysMountNumber] = useState(31)
  const daysMount= Array.from({length :daysMountNumber}, (_, index) => index + 1)
  const currentYear = new Date().getFullYear()
  const years = Array.from({length : 100}, (_,index) => currentYear - index)

  const monthSelected = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setDaysMountNumber(getDaysInCurrentYearMonth(parseInt(e.target.value)))
  } 

  return (
    <div className="w-full h-screen bg-[#F0F2F5]">
      <div>
        <input type="text" placeholder="Nombre"/>
        <input type="text" placeholder="Apellido"/>
      </div>

      <select id="day">
        {daysMount.map((dayNumber) => {
          return <option key={dayNumber} value={dayNumber}>{dayNumber}</option>
        })}
      </select>

      <select id="month" onChange={monthSelected} name="month">
        {arrayMonths.map((month, index) => {
          return <option  key={index} value={index}>{month}</option>
        })}
      </select>

      <select id="year" name="year">
        {years.map((year) => {
          return <option key={year} value={year}>{year}</option>
        })}
      </select>
      
      <div>
        <input type="text" placeholder="Correo"/>
        <input type="password" placeholder="Contraseña"/>
      </div>

    </div>
  )
}

export default RegisterView