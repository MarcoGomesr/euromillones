import useEuromillon from '@/hooks/useEuromillon'
import { type IEuromillon } from '../../types'

interface Props {
  result: IEuromillon[]
}

export default function RandomNumbers({ result }: Props) {
  const { resultNumber, resultStarts } = useEuromillon(result)

  const checkResultNumber = (current: string, type = 'numbers') => {
    const lastResult = result.at(-1)
    if (type === 'numbers') {
      if (lastResult?.numbers.includes(current) === true) {
        return (
          <>
            {current}
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 -top-4"></span>
          </>
        )
      }
    } else {
      if (lastResult?.stars.includes(current) === true) {
        return (
          <>
            {current}
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 -top-4"></span>
          </>
        )
      }
    }

    return current
  }

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
    const filteredCounts = uniqueCounts.filter((number) => number >= 7)
    const shuffledCounts = filteredCounts.sort(() => Math.random() - 0.5)
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
    <section className="mt-4">
      <ul className="grid grid-flow-col gap-4 md:gap-2 items-center justify-center align-middle ">
        {pickRandomNumbers(resultNumber, 5).map((selectedNumbers, index) => (
          <li
            key={index}
            className="lg:w-16 lg:h-16 md:w-13 md:h-13 h-10 w-10 text-base flex sm:text-base flex-row content-center font-bold justify-center items-center bg-blue-600  rounded-full text-white"
          >
            {checkResultNumber(selectedNumbers.number)}
          </li>
        ))}
        {pickRandomNumbers(resultStarts, 2).map(
          (selectedNumbersStart, index) => (
            <li
              key={index}
              className="flex font-bold h-10 w-10 text-basejustify-center bg-yellow-500 text-white items-center justify-center"
            >
              {checkResultNumber(selectedNumbersStart.number, 'stars')}
            </li>
          )
        )}
      </ul>
    </section>
  )
}
