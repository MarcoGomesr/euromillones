import { getEuroMillionResults } from '@/services/EuroMillion'

import TodayResults from '../TodayResults'
import EuroMillonStatsTable from './EuroMillonStatsTable'
import PreviousFiveNumbers from './PreviousFiveNumbers'
import ProbabilityComponent from './ProbabilityComponent'

const EuroMillon: React.FC = async () => {
  const euromillonResults = await getEuroMillionResults()

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
      <ProbabilityComponent result={euromillonResults} />
      <ProbabilityComponent result={euromillonResults} />
      <ProbabilityComponent result={euromillonResults} />
      <ProbabilityComponent result={euromillonResults} />
      <ProbabilityComponent result={euromillonResults} />
      <TodayResults result={euromillonResults} />
      <h3 className="text-center">Resultados anteriores</h3>

      <PreviousFiveNumbers euromillonResults={euromillonResults} />
      <EuroMillonStatsTable result={euromillonResults} />
    </>
  )
}

export default EuroMillon
