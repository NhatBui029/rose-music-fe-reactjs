import { StatusInstrumentEnum } from '../types/facility.type'

export const E2VstatusInstrument = (status: string) => {
  return StatusInstrumentEnum[
    status as unknown as keyof typeof StatusInstrumentEnum
  ]
}
