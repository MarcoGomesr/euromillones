import { type IEuromillon } from '@/types'
import React from 'react'

function predictStarsFromData(result: IEuromillon[]) {
  // Step 1: Extract all stars from result
  const starsData = result.map((item) => item.stars).flat()

  // Step 2: Count occurrences of each star
  const starCount = starsData.reduce<Record<string, number>>((acc, star) => {
    acc[star] = (typeof acc[star] === 'number' ? acc[star] : 0) + 1
    return acc
  }, {})

  // Step 3: Create a weighted probability array
  const starsList = Object.keys(starCount)
  const totalStars = starsData.length
  const probabilities = starsList.map((star) => ({
    star,
    probability: starCount[star] / totalStars // Probability is based on its frequency
  }))

  // Step 4: Select two stars based on probabilities
  function getRandomStar(probabilities) {
    const random = Math.random()
    let cumulativeProbability: number = 0

    for (const { star, probability } of probabilities) {
      cumulativeProbability += probability
      if (random < cumulativeProbability) {
        return star
      }
    }
  }

  // Predict two unique stars
  const selectedStars = new Set()

  while (selectedStars.size < 2) {
    const randomStar = getRandomStar(probabilities)
    selectedStars.add(randomStar)
  }

  return Array.from(selectedStars)
}

const ProbabilityComponent = ({ result }: Props) => {
  const transformedData = result.map((item) => item.numbers)

  // console.log(transformedData)

  const frequencyMap: Record<string, number> = {}

  // Count the frequency of each number
  transformedData.forEach((draw) => {
    draw.forEach((number: string) => {
      if (frequencyMap[number] !== undefined) {
        frequencyMap[number]++ // Increment if the number already exists in the map
      } else {
        frequencyMap[number] = 1 // Initialize to 1 if the number doesn't exist yet
      }
    })
  })

  // Convert frequency map to an array of numbers, weighted by their frequency
  const weightedNumbers = []
  for (const [number, count] of Object.entries(frequencyMap)) {
    for (let i = 0; i < count; i++) {
      weightedNumbers.push(number)
    }
  }

  // Function to predict 5 random winner numbers
  const predictWinners = () => {
    const predictions = new Set()

    // Ensure we get exactly 5 unique predictions
    while (predictions.size < 5) {
      const randomIndex = Math.floor(Math.random() * weightedNumbers.length)
      predictions.add(weightedNumbers[randomIndex])
    }

    return Array.from(predictions)
  }

  // Example usage
  const predictedNumbers = predictWinners()
  const sortedArray = predictedNumbers.sort((a, b) => Number(a) - Number(b))
  const predictedStars = predictStarsFromData(result)
  return (
    <section className="mt-4">
      <ul className="grid grid-flow-col gap-4 md:gap-2 items-center justify-center align-middle ">
        {sortedArray.map((selectedNumbers, index) => (
          <li
            key={index}
            className="lg:w-16 lg:h-16 md:w-13 md:h-13 h-10 w-10 text-base flex sm:text-base flex-row content-center font-bold justify-center items-center bg-blue-600  rounded-full text-white"
          >
            {selectedNumbers}
          </li>
        ))}
        {predictedStars.map((selectedNumbersStart, index) => (
          <li
            key={index}
            className="flex font-bold h-10 w-10 text-basejustify-center bg-yellow-500 text-white items-center justify-center"
          >
            {selectedNumbersStart}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProbabilityComponent
