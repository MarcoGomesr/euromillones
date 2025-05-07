'use client'
import { Prediction } from '@/types'

export default function GenerateNumbers({
  results: predictionNumbers
}: {
  results: Prediction[]
}) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {predictionNumbers.map((prediction, predictionIndex) => (
        <div
          key={predictionIndex}
          className="flex flex-row gap-2 justify-center items-center"
        >
          {/* Numbers */}
          {prediction.numbers?.map((number, index) => (
            <li
              key={index + Number(number)}
              className="lg:w-16 lg:h-16 md:w-13 md:h-13 h-10 w-10 text-base flex sm:text-base flex-row content-center font-bold justify-center items-center bg-blue-600 rounded-full text-white"
            >
              {number}
            </li>
          ))}

          {/* Stars */}
          {prediction.stars?.map((number, index) => (
            <li
              key={index + Number(number)}
              className="flex font-bold h-10 w-10 text-base justify-center bg-yellow-500 text-white items-center rounded-full"
            >
              <span>{number}</span>
            </li>
          ))}
        </div>
      ))}
    </div>
  )
}
