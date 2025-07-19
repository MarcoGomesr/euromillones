import { type IEuromillon } from '@/types'

export const formatDate = (lastNumber: IEuromillon) => {
  const dateString = lastNumber.date ?? new Date()

  const dateObj = new Date(dateString)

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  } as const

  return dateObj.toLocaleDateString('es-ES', options)
}
