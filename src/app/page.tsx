import usePredictions from '@/hooks/usePredictions'
import TodayResults from '@/components/TodayResults'
import GenerateNumbers from '@/components/GenerateNumbers'
import EuroMillonStatsTable from '@/components/EuroMillonStatsTable'

import { getEuroMillionResults } from '@/services/EuroMillion'

export default async function HomePage() {
  const euromillonResults = await getEuroMillionResults()

  const results = await usePredictions(euromillonResults, 5)

  return (
    <main className="min-h-screen container mx-auto">
      <h1 className="font-bold text-center text-6xl  mt-10">Euromillón</h1>
      <h2 className="text-center text-3xl mt-3 mb-6">
        Generador de números aleatorios basados en el promedio de los números
        ganadores
      </h2>

      <span className="my-4 block text-center">
        Numeros aleatorios generados a partir el promedio del numeros ganadores
      </span>
      <GenerateNumbers results={results} />

      <TodayResults result={euromillonResults} />
      <h3 className="text-center">Resultados anteriores</h3>

      {/* <PreviousFiveNumbers euromillonResults={euromillonResults} /> */}
      <EuroMillonStatsTable result={euromillonResults} />
    </main>
  )
}
