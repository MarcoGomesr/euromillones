import React from 'react'
import { type IEuromillon } from '@/types'

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
      <h2 className="text-center mt-10">Resultados anteriores</h2>
      {previousNumbersOnly.map((item, index) => (
        <section key={index} className="mt-4">
          <div className="w-full px-2">
            <ul className="grid grid-flow-col gap-4 md:gap-2 items-center justify-center align-middle overflow-x-auto max-w-full">
              {item.numbers.map((number, numIndex) => (
                <li
                  key={numIndex}
                  className="h-8 w-8 text-base flex sm:text-base flex-row content-center font-bold justify-center items-center bg-blue-600  rounded-full text-white"
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
          </div>
        </section>
      ))}
    </>
  )
}

export default PreviousFiveNumbers
