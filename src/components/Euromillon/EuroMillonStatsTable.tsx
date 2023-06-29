import useEuromillon from '@/hooks/useEuromillon'
import { type IEuromillon } from '../../../types.d'

interface Props {
  result: IEuromillon[]
}

export default function EuroMillonStatsTable({ result }: Props) {
  // Create an object to store the counts of each number

  const { resultNumber, resultStarts } = useEuromillon(result)

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-10 flex justify-center items-start">
      <table className=" text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-blue-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              Numeros
            </th>
            <th scope="col" className="px-6 py-3">
              Contador
            </th>
            <th scope="col" className="px-6 py-3">
              porcentage
            </th>
          </tr>
        </thead>
        <tbody>
          {resultNumber.map(({ number, count, percentage }, index) => (
            <tr className="bg-white border-b" key={index}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {number}
              </th>
              <td className="px-6 py-4">{count}</td>
              <td className="px-6 py-4">{percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-yellow-400 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              estrellas
            </th>
            <th scope="col" className="px-6 py-3">
              Contador
            </th>
            <th scope="col" className="px-6 py-3">
              porcentage
            </th>
          </tr>
        </thead>
        <tbody>
          {resultStarts.map(({ number, count, percentage }, index) => (
            <tr className="bg-white border-b " key={index}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {number}
              </th>
              <td className="px-6 py-4">{count}</td>
              <td className="px-6 py-4">{percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
