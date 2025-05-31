import EuroMillonStatsTable from '@/components/EuroMillonStatsTable'
import GenerateNumbers from '@/components/GenerateNumbers'
import TodayResults from '@/components/TodayResults'
import { IEuromillon, Prediction } from '@/types'
import PreviousPredictions from './components/PreviousPredictions'
import PreviousFiveNumbers from '@/components/PreviousFiveNumbers'

export default function HomeView({
  results,
  euromillonResults,
  lastPrediction
}: {
  results: Prediction[]
  euromillonResults: IEuromillon[]
  lastPrediction: Prediction[]
}) {
  return (
    <>
      <h1 className="font-bold text-center text-6xl  mt-10">Euromillón</h1>
      <h2 className="text-center text-3xl mt-3 mb-6">
        Generador de números aleatorios basados en el promedio de los números
        ganadores
      </h2>

      <span className="my-4 block text-center">
        Numeros aleatorios generados a partir el promedio del numeros ganadores
      </span>
      <GenerateNumbers predictions={results} />

      <TodayResults result={euromillonResults} />
      <PreviousPredictions
        predictions={lastPrediction}
        results={euromillonResults}
      />
      {/* <h3 className="text-center">Resultados anteriores</h3> */}

      <PreviousFiveNumbers euromillonResults={euromillonResults} />
      {/* <EuroMillonStatsTable result={euromillonResults} /> */}
    </>
  )
}
