// const fetcher = async (url: string) => {
//   const options = { method: 'GET', headers: { accept: 'application/json' } }
//   return await fetch(url, options).then(async r => await r.json())
// }

// export const getEuroMillionResults = async () => {
//   const options = { method: 'GET', headers: { accept: 'application/json' } }
//   return await fetch(url, options).then(async r => await r.json())
// }

export const getEuroMillionResults = async () => {
  // const API_EUROMILLON = process.env.NEXT_PUBLIC_API_EUROMILLON ?? ''

  const options = { method: 'GET', headers: { accept: 'application/json' } }
  const res = await fetch(
    'https://euromillions.api.pedromealha.dev/draws?year=2023',
    options
  )
  return await res.json()
}
