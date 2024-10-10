import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Facility,
  FacilityForm,
  FacilitysResponse,
} from '../../types/facility.type'
import { API_ENPOINTS } from '../api.constants'
import apiInstance from '../apiInstance'
import { AxiosError } from 'axios'

const GET_FACILITY_QUERY_KEY = 'GET_FACILITY'
const GET_FACILITY_DETAIL_QUERY_KEY = 'GET_FACILITY_DETAIL'

const createFacility = (data: FacilityForm) => {
  return apiInstance.post<FacilityForm, void>(API_ENPOINTS.FACILITY, data)
}

const getFacilitys = () => {
  return apiInstance.get<void, FacilitysResponse>(API_ENPOINTS.FACILITY)
}

const getFacilityDetail = (id: number) => {
  return apiInstance.get<void, Facility>(API_ENPOINTS.FACILITY_DETAIL(id))
}

export const useCreateFacility = () => {
  return useMutation<void, AxiosError, FacilityForm>({
    mutationFn: (data: FacilityForm) => createFacility(data),
  })
}

export const useGetFacilitys = () => {
  return useQuery<FacilitysResponse, AxiosError>({
    queryKey: [GET_FACILITY_QUERY_KEY],
    queryFn: getFacilitys,
  })
}

export const useGetFacilityDetail = (id: number) => {
  return useQuery<Facility, AxiosError>({
    queryKey: [GET_FACILITY_DETAIL_QUERY_KEY, id],
    queryFn: () => getFacilityDetail(id),
  })
}
