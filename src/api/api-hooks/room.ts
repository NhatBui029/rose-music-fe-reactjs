import { useMutation } from '@tanstack/react-query'
import { RoomForm } from '../../types/facility.type'
import { API_ENPOINTS } from '../api.constants'
import apiInstance from '../apiInstance'
import { AxiosError } from 'axios'

const createRoom = (id: number, data: RoomForm) => {
  return apiInstance.post<RoomForm, void>(API_ENPOINTS.ROOM(id), data)
}

export const useCreateRoom = (id: number) => {
  return useMutation<void, AxiosError, RoomForm>({
    mutationFn: (data: RoomForm) => createRoom(id, data),
    onError: (err: AxiosError) => {
      console.log('🚀 ~ useCreateRoom ~ err:', err)
      return
    },
  })
}
