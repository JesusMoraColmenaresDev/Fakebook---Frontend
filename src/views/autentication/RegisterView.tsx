import { set, useForm } from "react-hook-form"
import { getDaysInCurrentYearMonth, getDaysMount, GetYears } from "../../utils/dateUtils"
import { useEffect, useState } from "react"

const arrayMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

function RegisterView() {

  const [sizeWindow, setSizeWindow] = useState(window.innerWidth)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [daysMountNumber, setDaysMountNumber] = useState(31)

  const monthSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDaysMountNumber(getDaysInCurrentYearMonth(parseInt(e.target.value)))
  }

  useEffect(() => {
      window.addEventListener('resize', () => setSizeWindow(window.innerWidth))
      return () => window.removeEventListener('resize', () => setSizeWindow(window.innerWidth))
  }, [])

  const isTiny = sizeWindow <= 500

  return (
    <>
      <div className="w-full h-screen bg-[#F0F2F5] flex flex-col items-center justify-center">
        <h1 className="text-[#1877F2] mb-8 font-bold text-6xl w-fit max-md:w-full max-md:text-center">fakebook</h1>

        <div className={`bg-white ${isTiny ? "w-[320px]" : "w-[500px]"} flex flex-col items-center`}>
          <div className="border-b-1 border-[#D3D3D3] flex flex-col items-center p-2 w-full">
            <p className="font-bold text-2xl">Crea una cuenta</p>
            <p className="text-lg text-[#606266]">Es rapido y facil</p>
          </div>

          <div className="p-4 flex flex-col gap-4 w-full">
            <div className="flex justify-between gap-4">
              <input type="text" className="border-1 rounded-lg p-2 w-1/2 border-[#D3D3D3]" {...register("name", { required: true })} placeholder="Nombre" />
              <input type="text" className="border-1 rounded-lg p-2 w-1/2 border-[#D3D3D3]" {...register("lastName", { required: true })} placeholder="Apellido" />
            </div>

            <div>
              <p className="font-semibold text-sm text-[#606266]">Fecha de nacimiento</p>
              <div className="flex justify-between gap-4">
                <select className="border-1 rounded-sm p-1 w-3/4 border-[#D3D3D3]" id="day">
                  {getDaysMount(daysMountNumber).map((dayNumber) => {
                    return <option key={dayNumber} value={dayNumber}>{dayNumber}</option>
                  })}
                </select>


                <select className="border-1 rounded-sm p-1 w-3/4 border-[#D3D3D3]" id="month" onChange={monthSelected} name="month">
                  {arrayMonths.map((month, index) => {
                    return <option key={index} value={index}>{month}</option>
                  })}
                </select>

                <select className="border-1 rounded-sm p-1 w-3/4 border-[#D3D3D3]" id="year" name="year">
                  {GetYears().map((year) => {
                    return <option key={year} value={year}>{year}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <input type="text" className="border-1 rounded-lg p-2 border-[#D3D3D3]" {...register("email", { required: true })} placeholder="Correo" />
              <input type="password" className="border-1 rounded-lg p-2 border-[#D3D3D3]" {...register("password", { required: true })} placeholder="Contraseña" />
            </div>
          </div>

          <button className="bg-[#4CAF50] text-white font-bold py-2 px-4 rounded-sm text-lg w-fit">
            Registrate
          </button>
          <a className="text-[#1877F2] w-full text-center border-b-1 border-b-[#D3D3D3] py-4 " href="/">¿Ya tienes cuenta?</a>
        </div>
      </div>
    </>

  )
}

export default RegisterView