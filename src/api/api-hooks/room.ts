import { useMutation, useQuery } from '@tanstack/react-query'
import {
  ResponseGetListApi,
  Room,
  BodyFormData,
  ResponseGetDetail,
} from '../../types/facility.type'
import { API_ENPOINTS } from '../api.constants'
import apiInstance from '../apiInstance'
import { AxiosError } from 'axios'

const GET_ROOM_QUERY_KEY = 'GET_ROOM'
const GET_ROOM_DETAIL_QUERY_KEY = 'GET_ROOM_DETAIL'

type RoomForm = BodyFormData<Room>

const createRoom = (id: number, data: RoomForm) => {
  return apiInstance.post<RoomForm, void>(API_ENPOINTS.ROOM(id), data)
}

const getRooms = (facilityId: number) => {
  return apiInstance.get<void, ResponseGetListApi<Room>>(
    API_ENPOINTS.ROOM(facilityId),
  )
}

const getRoomDetail = (facilityId: number, roomId: number) => {
  return apiInstance.get<void, ResponseGetDetail<Room>>(
    API_ENPOINTS.ROOM_DETAIL(facilityId, roomId),
  )
}

const editRoom = (facilityId: number, roomId: number, data: RoomForm) => {
  return apiInstance.put<RoomForm, void>(
    API_ENPOINTS.ROOM_DETAIL(facilityId, roomId),
    data,
  )
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

export const useGetRooms = (facilityId: number) => {
  return useQuery<ResponseGetListApi<Room>, AxiosError>({
    queryKey: [GET_ROOM_QUERY_KEY, facilityId],
    queryFn: () => getRooms(facilityId),
  })
}

export const useGetRoomDetail = (facilityId: number, roomId: number) => {
  return useQuery<ResponseGetDetail<Room>, AxiosError>({
    queryKey: [GET_ROOM_DETAIL_QUERY_KEY, facilityId, roomId],
    queryFn: () => getRoomDetail(facilityId, roomId),
  })
}

export const useEditRoom = (facilityId: number, roomId: number) => {
  return useMutation<void, AxiosError, RoomForm>({
    mutationFn: (data: RoomForm) => editRoom(facilityId, roomId, data),
  })
}
