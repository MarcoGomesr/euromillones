import useEuromillon from '@/hooks/useEuromillon'
import { type IEuromillon } from '../../../types.d'

interface Props {
  result: IEuromillon[]
}

export default function RandomNumbers({ result }: Props) {
  const { resultNumber, resultStarts } = useEuromillon(result)

  function pickRandomNumbers(
    array: Array<{
      number: string
      count: number
      percentage: string
    }>,
    end: number
  ) {
    const uniqueCounts = Array.from(new Set(array.map((item) => item.count)))
    // Shuffle the unique counts array
    const shuffledCounts = uniqueCounts.sort(() => Math.random() - 0.5)

    // Pick the first 5 unique counts
    const selectedCounts = shuffledCounts.slice(0, end)

    // Filter array elements with the selected counts
    const selectedNumbers = []
    const selectedCountsSet = new Set(selectedCounts)

    for (const item of array) {
      if (selectedCountsSet.has(item.count)) {
        selectedNumbers.push(item)
        selectedCountsSet.delete(item.count)
      }
    }
    selectedNumbers.sort((a, b) => Number(a.number) - Number(b.number))

    return selectedNumbers
  }

  return (
    <section className="pt-10">
      <ul className="grid grid-flow-col gap-4">
        {pickRandomNumbers(resultNumber, 5).map((selectedNumbers, index) => (
          <li
            key={index}
            className="w-16 h-16 flex flex-row content-center font-bold justify-center items-center bg-blue-600 text-3xl rounded-full text-white"
          >
            {selectedNumbers.number}
          </li>
        ))}
        {pickRandomNumbers(resultStarts, 2).map(
          (selectedNumbersStart, index) => (
            <li
              key={index}
              className="w-16 h-16 flex font-bold text-3xl justify-center items-center bg-yellow-500 text-white"
            >
              {selectedNumbersStart.number}
            </li>
          )
        )}
      </ul>
    </section>
  )
}
