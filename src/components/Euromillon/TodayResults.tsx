import { type IEuromillon } from '../../../types.d'

interface Props {
  result: IEuromillon[]
}

export default function TodayResults({ result }: Props) {
  const resultArray = result.flat()
  const lastNumber = resultArray.pop()
  // const lastNumber = (result: IEuromillon[]) => result[result.length - 1]

  const dateString = lastNumber?.date ?? ''
  const date = new Date(dateString)

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  } as const

  const formattedDate = date.toLocaleDateString('es-ES', options)

  return (
    <section className="pt-10">
      <span className="mb-4 block  text-center">{`Euromillones - ${formattedDate}`}</span>
      <ul className="grid grid-flow-col gap-4 md:gap-2 items-center justify-center align-middle ">
        {lastNumber?.numbers?.map((number, index) => (
          <li
            key={index + Number(number)}
            className="lg:w-16 lg:h-16 md:w-13 md:h-13 h-10 w-10 text-base flex sm:text-base flex-row content-center font-bold justify-center items-center bg-blue-600  rounded-full text-white"
          >
            {number}
          </li>
        ))}
        {lastNumber?.stars?.map((number, index) => (
          <li
            key={index + Number(number)}
            className="flex font-bold h-10 w-10 text-basejustify-center  bg-yellow-500 text-white items-center justify-center"
          >
            {number}
          </li>
        ))}
      </ul>
    </section>
  )
}
