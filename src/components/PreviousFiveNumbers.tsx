import { type IEuromillon } from '@/types'
import React from 'react'

const PreviousFiveNumbers = ({
  euromillonResults
}: {
  euromillonResults: IEuromillon[]
}) => {
  const previousNumbers = euromillonResults.slice(-5)

  const previousNumbersOnly = previousNumbers.map((item) => ({
    numbers: item.numbers,
    stars: item.stars
  }))

  return (
    <>
      {previousNumbersOnly.map((item, index) => (
        <section key={index} className="mt-4">
          <ul className="grid grid-flow-col gap-4 md:gap-2 items-center justify-center align-middle">
            {item.numbers.map((number, numIndex) => (
              <li
                key={numIndex}
                className="lg:w-16 lg:h-16 md:w-13 md:h-13 h-10 w-10 text-base flex sm:text-base flex-row content-center font-bold justify-center items-center bg-blue-600 rounded-full text-white"
              >
                {number}
              </li>
            ))}
            {item.stars.map((star, starIndex) => (
              <li
                key={starIndex}
                className="flex font-bold h-10 w-10 text-base justify-center bg-yellow-500 text-white items-center"
              >
                {star}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}

export default PreviousFiveNumbers
