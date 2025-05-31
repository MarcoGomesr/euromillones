import fs from 'fs/promises'
import path from 'path'
import { Prediction } from '@/types'

export async function getPreviousPrediction(): Promise<{
  date: string
  predictions: Prediction[]
} | null> {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'shared', 'data')
    const predictionsFile = path.join(dataDir, 'predictions.json')

    // Read the predictions file
    const fileContent = await fs.readFile(predictionsFile, 'utf-8')
    const predictions: Record<string, Prediction[]> = JSON.parse(fileContent)

    // Get all dates and sort them in descending order
    const dates = Object.keys(predictions).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    )

    // If there are no predictions or only one prediction, return null
    if (dates.length <= 1) {
      console.log('No previous predictions available')
      return null
    }

    // Get the second most recent date (previous to the latest)
    const previousDate = dates[1]
    const previousPredictions = predictions[previousDate]

    console.log('Previous prediction date:', previousDate)

    return {
      date: previousDate,
      predictions: previousPredictions
    }
  } catch (error) {
    console.error('Error getting previous prediction:', error)
    return null
  }
}
