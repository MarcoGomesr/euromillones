import { getEuroMillionResults } from '@/services/EuroMillion'
import { type IEuromillon } from '../../../types'
import TodayResults from './TodayResults'
import EuroMillonStatsTable from './EuroMillonStatsTable'
import RandomNumbers from './RandomNumbers'

interface Props {
  result: IEuromillon[] // Make sure the result prop expects an array of IEuromillon objects
}

const EuroMillon: React.FC<Props> = async () => {
  const euromillonResults = await getEuroMillionResults()

  return (
    <div>
      <h1 className="font-bold text-center text-9xl mt-10">Euromillón</h1>
      <h2 className="text-center text-3xl mt-3 mb-6">
        Generador de números aleatorios basados en el promedio de los números
        ganadores
      </h2>
      <TodayResults result={[euromillonResults]} />
      <span className="mt-4 block">
        Numeros aleatorios ganadores del año 2023
      </span>
      <div className="">
        <RandomNumbers result={[euromillonResults]} />
        <RandomNumbers result={[euromillonResults]} />
        <RandomNumbers result={[euromillonResults]} />
      </div>
      <EuroMillonStatsTable result={[euromillonResults]} />
    </div>
  )
}

export default EuroMillon
