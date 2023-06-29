export default function useEuromillon(result) {
  const numberCounts: Record<string, number> = {}
  const numberStarsCounts: Record<string, number> = {}

  // Count the occurrences of each number
  for (const item of result) {
    for (const number of item.numbers) {
      if (numberCounts[number]) {
        numberCounts[number]++
      } else {
        numberCounts[number] = 1
      }
    }

    for (const number of item.stars) {
      if (numberStarsCounts[number]) {
        numberStarsCounts[number]++
      } else {
        numberStarsCounts[number] = 1
      }
    }
  }

  // // Calculate the percentage of each number
  const totalCount = result.length

  const resultNumber = Object.entries(numberCounts).map(([number, count]) => ({
    number,
    count,
    percentage: ((count / totalCount) * 100).toFixed(2) + '%'
  }))

  const resultStarts = Object.entries(numberStarsCounts).map(
    ([number, count]) => ({
      number,
      count,
      percentage: ((count / totalCount) * 100).toFixed(2) + '%'
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
