import { type IEuromillon } from '@/types.d'
import { formatDate } from '@/lib/formatDate'

export default function TodayResults({ result }: { result: IEuromillon[] }) {
  const resultArray = result.flat()
  const lastNumber = resultArray.pop() as IEuromillon

  const formattedDate = formatDate(lastNumber)

  return (
    <section className="pt-10">
      <span className="mb-4 block  text-center">{`Euromillones - ${formattedDate}`}</span>
      <ul className="grid grid-flow-col gap-4 md:gap-2 items-center justify-center align-middle">
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
            className="flex font-bold h-10 w-10 text-basejustify-center bg-yellow-500 text-white items-center justify-center"
          >
            <span>{number}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
