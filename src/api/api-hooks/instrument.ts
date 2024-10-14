import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Instrument,
  BodyFormData,
  ResponseGetListApi,
  ResponseGetDetail,
} from '../../types/facility.type'
import { API_ENPOINTS } from '../api.constants'
import apiInstance from '../apiInstance'
import { AxiosError } from 'axios'

const GET_INSTRUMENT_QUERY_KEY = 'GET_INSTRUMENT'
const GET_INSTRUMENT_DETAIL_QUERY_KEY = 'GET_INSTRUMENT_DETAIL'

type InstrumentForm = BodyFormData<Instrument>

const createInstrument = (id: number, data: InstrumentForm) => {
  return apiInstance.post<InstrumentForm, void>(
    API_ENPOINTS.INSTRUMENT(id),
    data,
  )
}

const getInstruments = (facilityId: number) => {
  return apiInstance.get<void, ResponseGetListApi<Instrument>>(
    API_ENPOINTS.INSTRUMENT(facilityId),
  )
}

const getInstrumentsWarehouse = (facilityId: number) => {
  return apiInstance.get<void, ResponseGetListApi<Instrument>>(
    API_ENPOINTS.INSTRUMENT_WAREHOUSE(facilityId),
  )
}

const getIntrumentDetail = (facilityId: number, instrumentId: number) => {
  return apiInstance.get<void, ResponseGetDetail<Instrument>>(
    API_ENPOINTS.INSTRUMENT_DETAIL(facilityId, instrumentId),
  )
}

const editInstrument = (
  facilityId: number,
  instrumentId: number,
  data: InstrumentForm,
) => {
  return apiInstance.put<InstrumentForm, void>(
    API_ENPOINTS.INSTRUMENT_DETAIL(facilityId, instrumentId),
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

export const useGetInstruments = (facilityId: number) => {
  return useQuery<ResponseGetListApi<Instrument>, AxiosError>({
    queryKey: [GET_INSTRUMENT_QUERY_KEY, facilityId],
    queryFn: () => getInstruments(facilityId),
  })
}

export const useGetInstrumentsWarehouse = (facilityId: number) => {
  return useQuery<ResponseGetListApi<Instrument>, AxiosError>({
    queryKey: [GET_INSTRUMENT_QUERY_KEY, 'WAREHOUSE', facilityId],
    queryFn: () => getInstrumentsWarehouse(facilityId),
    staleTime: 1000 * 60 * 2, //data trong vòng 2 phút sẽ được cache
  })
}

export const useGetInstrumentDetail = (
  facilityId: number,
  instrumentId: number,
) => {
  return useQuery<ResponseGetDetail<Instrument>, AxiosError>({
    queryKey: [GET_INSTRUMENT_DETAIL_QUERY_KEY, facilityId, instrumentId],
    queryFn: () => getIntrumentDetail(facilityId, instrumentId),
  })
}

export const useEditIntrument = (facilityId: number, instrumentId: number) => {
  return useMutation<void, AxiosError, InstrumentForm>({
    mutationFn: (data: InstrumentForm) =>
      editInstrument(facilityId, instrumentId, data),
    onError: (err: AxiosError) => {
      console.log(' useEditRoom ~ err:', err)
      return
    },
  })
}
