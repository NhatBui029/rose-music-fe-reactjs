import { useMutation } from '@tanstack/react-query'
import { InstrumentForm } from '../../types/facility.type'
import { API_ENPOINTS } from '../api.constants'
import apiInstance from '../apiInstance'
import { AxiosError } from 'axios'

const createInstrument = (id: number, data: InstrumentForm) => {
  return apiInstance.post<InstrumentForm, void>(
    API_ENPOINTS.INSTRUMENT(id),
    data,
  )
}

export const useCreateInstrument = (id: number) => {
  return useMutation<void, AxiosError, InstrumentForm>({
    mutationFn: (data: InstrumentForm) => createInstrument(id, data),
    onError: (err: AxiosError) => {
      console.log('🚀 ~ useCreateRoom ~ err:', err)
      return
    },
  })
}
