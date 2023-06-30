import { type IEuromillon } from '../../../types.d'

interface Props {
  result: IEuromillon[]
}

export default function TodayResults({ result }: Props) {
  const lastNumber = [...result].pop()
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
      <span className="mt-4 block">{`Euromillones - ${formattedDate}`}</span>
      <ul className="grid grid-flow-col gap-4">
        {lastNumber?.numbers?.map((number, index) => (
          <li
            key={index + Number(number)}
            className="w-16 h-16 flex flex-row content-center font-bold justify-center items-center bg-blue-600 text-3xl rounded-full text-white"
          >
            {number}
          </li>
        ))}
        {lastNumber?.stars?.map((number, index) => (
          <li
            key={index + Number(number)}
            className="w-16 h-16 flex font-bold text-3xl justify-center items-center bg-yellow-500 text-white"
          >
            {number}
          </li>
        ))}
      </ul>
    </section>
  )
}
