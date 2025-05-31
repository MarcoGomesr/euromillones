'use client'
import React from 'react'
import { IEuromillon, Prediction } from '@/types'

interface GenerateNumbersProps {
  predictions: Prediction[]
  isPrevious?: boolean
  results?: IEuromillon[] | Prediction[]
}

export default function GenerateNumbers({
  predictions,
  isPrevious,
  results
}: GenerateNumbersProps): React.ReactElement | undefined {
  if (!results) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center">
        {predictions?.map((prediction, predictionIndex) => (
          <div
            key={predictionIndex}
            className="flex flex-row gap-2 justify-center items-center"
          >
            {/* Numbers */}
            {prediction.numbers?.map((number, index) => (
              <li
                key={index + Number(number)}
                className="h-10 w-10 text-base flex sm:text-base flex-row content-center font-bold justify-center items-center bg-blue-600 rounded-full text-white"
              >
                {number}
              </li>
            ))}

            {/* Stars */}
            {prediction.stars?.map((number, index) => (
              <li
                key={index + Number(number)}
                className="star flex justify-center items-center w-16 h-16 bg-yellow-500"
              >
                <span>{number}</span>
              </li>
            ))}
          </div>
        ))}
      </div>
    )
  }

  const resultArray = results?.flat()
  const lastEuroMillionNumbers = resultArray.pop() as IEuromillon

  const calculateMatchPercentage = (prediction: Prediction) => {
    if (!lastEuroMillionNumbers) return 0

    const matchingNumbers = prediction.numbers.filter((num) =>
      lastEuroMillionNumbers.numbers.includes(num)
    ).length

    const matchingStars = prediction.stars.filter((star) =>
      lastEuroMillionNumbers.stars.includes(star)
    ).length

    const totalMatches = matchingNumbers + matchingStars
    const percentage = (totalMatches / 7) * 100 // 5 numbers + 2 stars = 7 total

    return Math.round(percentage)
  }

  if (isPrevious && lastEuroMillionNumbers) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center">
        {predictions?.map((prediction, predictionIndex) => {
          const matchPercentage = calculateMatchPercentage(prediction)

          return (
            <div
              key={predictionIndex}
              className="flex flex-row gap-2 justify-center items-center"
            >
              <div className="flex flex-row gap-2 justify-center items-center">
                {/* Numbers */}
                {prediction.numbers?.map((number, index) => (
                  <li
                    key={index + Number(number)}
                    className={`h-10 w-10 text-base flex sm:text-base flex-row content-center font-bold justify-center items-center rounded-full text-white ${
                      lastEuroMillionNumbers.numbers.includes(number)
                        ? 'bg-green-600'
                        : 'bg-blue-600'
                    }`}
                  >
                    {number}
                  </li>
                ))}

                {/* Stars */}
                {prediction.stars?.map((number, index) => (
                  <li
                    key={index + Number(number)}
                    className={`star flex justify-center items-center w-16 h-16  ${
                      lastEuroMillionNumbers.stars.includes(number)
                        ? 'bg-green-600'
                        : 'bg-yellow-500'
                    }`}
                  >
                    <span className="text-black">{number}</span>
                  </li>
                ))}
              </div>
              <div className="text-sm font-semibold">{matchPercentage}%</div>
            </div>
          )
        })}
      </div>
    )
  }
}
