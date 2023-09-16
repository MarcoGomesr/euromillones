import useEuromillon from '@/hooks/useEuromillon'
import { type IEuromillon } from '../../types'

interface Props {
  result: IEuromillon[]
}

export default function EuroMillonStatsTable({ result }: Props) {
  // Create an object to store the counts of each number

  const { resultNumber, resultStarts } = useEuromillon(result)

  const checkNumberIsResult = (currentNumber: string) => {
    const lastResult = result[result.length - 1]

    if (lastResult.numbers.includes(currentNumber)) {
      return (
        <span className="font-bold bg-blue-600  rounded-full text-white  h-3 w-3 inline p-1">
          {currentNumber}
        </span>
      )
    }
    return currentNumber
  }
  return (
    <div className="flex rounded-lg my-5 justify-center items-start relative overflow-x-auto">
      <table className="w-1/2 text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-blue-300">
          <tr className="bg-blue-400">
            <th scope="col" className="p-3 text-white">
              Numeros
            </th>
            <th scope="col" className="p-3 text-white">
              Contador
            </th>
          </tr>
        </thead>
        <tbody className="flex-1 sm:flex-none">
          {resultNumber.map(({ number, count }, index) => (
            <tr className="bg-white border-b" key={index}>
              <th
                scope="row"
                className="p-3 font-medium text-gray-900 whitespace-nowrap "
              >
                {checkNumberIsResult(number)}
              </th>
              <td className="p-3">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-yellow-400 ">
          <tr>
            <th scope="col" className="p-3 text-white">
              estrellas
            </th>
            <th scope="col" className="p-3 text-white">
              Contador
            </th>
          </tr>
        </thead>
        <tbody>
          {resultStarts.map(({ number, count, percentage }, index) => (
            <tr className="bg-white border-b " key={index}>
              <th
                scope="row"
                className="p-3 font-medium text-gray-900 whitespace-nowrap "
              >
                {number}
              </th>
              <td className="p-3">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
