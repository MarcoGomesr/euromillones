import usePredictions from '@/hooks/usePredictions'

import { getEuroMillionResults } from '@/services/EuroMillion'
import HomeView from './HomeView'
import { previousPredictionAction } from './previousPredictionAction'

export default async function HomePage() {
  const euromillonResults = await getEuroMillionResults()

  const results = await usePredictions(euromillonResults, 5)
  const { predictions } = await previousPredictionAction()
  return (
    <HomeView
      results={results}
      euromillonResults={euromillonResults}
      lastPrediction={predictions}
    />
  )
}
