import { formatDate } from '@/shared/lib/formatDate'
import { type IEuromillon } from '@/types.d'

export default function TodayResults({ result }: { result: IEuromillon[] }) {
  const resultArray = result.flat()
  const lastNumber = resultArray.pop() as IEuromillon

  const formattedDate = formatDate(lastNumber)

  return (
    <section className="pt-10">
      <span className="mb-4 block text-center">{` ${formattedDate}`}</span>
      <ul className="flex flex-row gap-2 justify-center items-center overflow-x-auto bg-green-200 py-6 my-5">
        {lastNumber?.numbers?.map((number, index) => (
          <li
            key={index + Number(number)}
            className="h-8 w-8 text-base flex sm:text-base flex-row content-center font-bold justify-center items-center bg-blue-600  rounded-full text-white"
          >
            {number}
          </li>
        ))}
        {lastNumber?.stars?.map((number, index) => (
          <li
            key={index + Number(number)}
            className="star flex justify-center items-center w-10 h-10 bg-yellow-500"
          >
            <span>{number}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
