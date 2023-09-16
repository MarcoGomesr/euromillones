import { getEuroMillionResults } from '@/services/EuroMillion'

import TodayResults from '../TodayResults'
import EuroMillonStatsTable from './EuroMillonStatsTable'
import RandomNumbers from './RandomNumbers'

const EuroMillon: React.FC = async () => {
  const euromillonResults = await getEuroMillionResults()

  return (
    <>
      <h1 className="font-bold text-center text-6xl  mt-10">Euromillón</h1>
      <h2 className="text-center text-3xl mt-3 mb-6">
        Generador de números aleatorios basados en el promedio de los números
        ganadores
      </h2>
      <TodayResults result={euromillonResults} />
      <span className="my-4 block  text-center ">
        Numeros aleatorios generados a partir el promedio del numeros ganadores
        del año 2023
      </span>
      <div className="mt-4">
        <RandomNumbers result={euromillonResults} />
        <RandomNumbers result={euromillonResults} />
        <RandomNumbers result={euromillonResults} />
      </div>
      <EuroMillonStatsTable result={euromillonResults} />
    </>
  )
}

export default EuroMillon
