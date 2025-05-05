export const getEuroMillionResults = async () => {
  const currentYear = new Date().getFullYear()
  const API_URL = `https://euromillions.api.pedromealha.dev/draws?year=${currentYear}`

  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      accept: 'application/json'
    },
    next: { revalidate: 60 }
  })

  if (!res.ok) return []

  return await res.json()
}
