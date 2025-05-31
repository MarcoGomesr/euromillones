'use server'

import { getPreviousPrediction } from './getPreviousPrediction'

export async function previousPredictionAction() {
  return await getPreviousPrediction()
}
