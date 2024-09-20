import React from 'react'

const analyzePatterns = (data) => {
  const frequency = {}

  data.forEach((arr) => {
    const key = arr.join(',')
    frequency[key] = (frequency[key] || 0) + 1
  })

  const probabilities = Object.entries(frequency)
    .map(([combination, count]) => ({
      combination,
      probability: (count / data.length) * 100 // percentage
    }))
    .sort((a, b) => b.probability - a.probability) // Sort by probability descending

  return probabilities.slice(0, 5) // Return top 5
}

// The function to predict stars based on probabilities
function predictStarsFromData(result) {
  // Step 1: Extract all stars from result
  const starsData = result.map((item) => item.stars).flat()

  // Step 2: Count occurrences of each star
  const starCount = starsData.reduce((acc, star) => {
    acc[star] = (acc[star] || 0) + 1
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
    let cumulativeProbability = 0

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

const ProbabilityComponent = ({ result }) => {
  const transformedData = result.map((item) => item.numbers)

  // console.log(transformedData)

  const frequencyMap = {}

  // Count the frequency of each number
  transformedData.forEach((draw) => {
    draw.forEach((number) => {
      if (frequencyMap[number]) {
        frequencyMap[number]++
      } else {
        frequencyMap[number] = 1
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
