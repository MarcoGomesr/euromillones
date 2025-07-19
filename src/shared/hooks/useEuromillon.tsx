import { type IEuromillon } from '../../types'

export default function useEuromillon(result: IEuromillon[]) {
  const numberCounts: Record<string, number> = {}
  const numberStarsCounts: Record<string, number> = {}

  result = result.flat()

  // Count the occurrences of each number
  for (const item of result) {
    if (!Array.isArray(item.numbers)) {
      continue // Skip this iteration if numbers is not an array
    }
    for (const number of item.numbers) {
      if (numberCounts[number] !== undefined && !isNaN(numberCounts[number])) {
        numberCounts[number]++
      } else {
        numberCounts[number] = 1
      }
    }

    for (const number of item.stars) {
      if (
        numberStarsCounts[number] !== undefined &&
        !isNaN(numberStarsCounts[number])
      ) {
        numberStarsCounts[number]++
      } else {
        numberStarsCounts[number] = 1
      }
    }
  }

  const resultNumber = Object.entries(numberCounts).map(([number, count]) => ({
    number,
    count
  }))

  const resultStarts = Object.entries(numberStarsCounts).map(
    ([number, count]) => ({
      number,
      count
    })
  )

  // Sort the result array by count in descending order
  resultNumber.sort((a, b) => b.count - a.count)
  resultStarts.sort((a, b) => b.count - a.count)

  return {
    resultNumber,
    resultStarts
  }
}
