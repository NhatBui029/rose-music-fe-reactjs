import { DefaultError, useMutation } from '@tanstack/react-query'
import { FacilityForm } from '../../types/facility.type'
import { API_ENPOINTS } from '../api.constants'
import apiInstance from '../apiInstance'

const createFacility = (data: FacilityForm) => {
  return apiInstance.post<FacilityForm, void>(API_ENPOINTS.FACILITY, data)
}

export const useCreateFacility = () => {
  return useMutation<void, DefaultError, FacilityForm>({
    mutationFn: (data: FacilityForm) => createFacility(data),
  })
}
