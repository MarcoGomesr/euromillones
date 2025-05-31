import GenerateNumbers from '@/components/GenerateNumbers'
import { Prediction } from '@/types'

export default function PreviousPredictions({
  predictions,
  results
}: {
  predictions: Prediction[]
  results: Prediction[]
}) {
  return (
    <GenerateNumbers
      predictions={predictions}
      isPrevious={true}
      results={results}
    />
  )
}
