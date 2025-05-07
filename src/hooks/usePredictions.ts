import { prisma } from '@/lib/db'
import { Prediction, type IEuromillon } from '@/types'

function predictStarsFromData(result: IEuromillon[]): string[] {
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
  function getRandomStar(
    probabilities: Array<{ star: string; probability: number }>
  ): string {
    const random = Math.random()
    let cumulativeProbability: number = 0

    for (const { star, probability } of probabilities) {
      cumulativeProbability += probability
      if (random < cumulativeProbability) {
        return star
      }
    }
    return probabilities[0].star // Fallback to first star if no selection made
  }

  // Predict two unique stars
  const selectedStars = new Set<string>()

  while (selectedStars.size < 2) {
    const randomStar = getRandomStar(probabilities)
    selectedStars.add(randomStar)
  }

  return Array.from(selectedStars)
}

export default async function usePredictions(
  result: IEuromillon[],
  count: number = 5
): Promise<Prediction[]> {
  try {
    const transformedData = result.map((item) => item.numbers)
    const lastResult = result.at(-1)

    if (!lastResult) {
      throw new Error('No results available to generate predictions')
    }

    const dateId = new Date(lastResult.date).toISOString().split('T')[0] // Format: YYYY-MM-DD

    // check if the prediction with the last date exist in the DB
    const existingPrediction = await prisma.probabilityCombination.findUnique({
      where: {
        date: new Date(dateId)
      }
    })

    // if exist return the prediction
    if (existingPrediction) {
      return JSON.parse(existingPrediction.predictions) as Prediction[]
    }

    // Generate predictions if they don't exist
    const frequencyMap: Record<string, number> = {}

    // Count the frequency of each number
    transformedData.forEach((draw) => {
      draw.forEach((number: string) => {
        frequencyMap[number] = (frequencyMap[number] ?? 0) + 1
      })
    })

    // Convert frequency map to an array of numbers, weighted by their frequency
    const weightedNumbers: string[] = []
    for (const [number, count] of Object.entries(frequencyMap)) {
      for (let i = 0; i < count; i++) {
        weightedNumbers.push(number)
      }
    }

    // Function to predict 5 random winner numbers
    const predictWinners = (): string[] => {
      const predictions = new Set<string>()

      // Ensure we get exactly 5 unique predictions
      while (predictions.size < 5) {
        const randomIndex = Math.floor(Math.random() * weightedNumbers.length)
        predictions.add(weightedNumbers[randomIndex])
      }

      return Array.from(predictions).sort((a, b) => Number(a) - Number(b))
    }

    // Generate multiple predictions
    const predictions: Prediction[] = []
    for (let i = 0; i < count; i++) {
      predictions.push({
        numbers: predictWinners(),
        stars: predictStarsFromData(result)
      })
    }

    // Save the new predictions
    await prisma.probabilityCombination.create({
      data: {
        date: new Date(dateId),
        predictions: JSON.stringify(predictions)
      }
    })

    return predictions
  } catch (error) {
    console.error('Error in usePredictions:', error)
    throw error
  }
}
