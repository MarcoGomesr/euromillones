'use client'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const options = { method: 'GET', headers: { accept: 'application/json' } }
  return await fetch(url, options).then(async (r) => await r.json())
}

export const getEuroMillionResults = () => {
  // console.log(process)
  const { data, error, isLoading } = useSWR(
    'https://euromillions.api.pedromealha.dev/draws?year=2023',
    fetcher
  )

  return {
    euromillonResults: data,
    isLoading,
    isError: error
  }
}
