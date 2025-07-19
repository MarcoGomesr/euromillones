import fs from 'fs/promises'
import path from 'path'
import { type IEuromillon, Prediction } from '@/types'

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

    // Format date as YYYY-MM-DD
    const dateId = new Date(lastResult.date).toISOString().split('T')[0]
    const dataDir = path.join(process.cwd(), 'src', 'shared', 'data')
    const predictionsFile = path.join(dataDir, 'predictions.json')
    console.log('Predictions file path:', predictionsFile)

    // Check if predictions file exists and read existing data
    let existingPredictions: Record<string, Prediction[]> = {}
    try {
      const fileContent = await fs.readFile(predictionsFile, 'utf-8')
      existingPredictions = JSON.parse(fileContent)
      console.log(
        'Existing predictions dates:',
        Object.keys(existingPredictions)
      )
    } catch (error) {
      console.log(
        'No existing predictions file or invalid JSON, starting fresh'
      )
    }

    // Check if prediction for this date already exists
    if (existingPredictions[dateId]) {
      console.log('Predictions already exist for date:', dateId)
      return existingPredictions[dateId]
    }

    console.log('Generating new predictions for date:', dateId)

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
    existingPredictions[dateId] = predictions
    try {
      // Format the JSON with proper indentation
      const formattedJson = JSON.stringify(existingPredictions, null, 2)
      await fs.writeFile(predictionsFile, formattedJson)
      console.log('Successfully saved new predictions for date:', dateId)
    } catch (error) {
      console.error('Error saving predictions:', error)
      // Continue execution even if save fails
    }

    return predictions
  } catch (error) {
    console.error('Error in usePredictions:', error)
    throw error
  }
}
