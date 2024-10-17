import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  BodyFormData,
  ResponseGetDetail,
  ResponseGetListApi,
  SearchParams,
} from 'src/types/common.type'
import { Teacher } from 'src/types/teacher.type'

const GET_TEACHER_QUERY_KEY = 'GET_TEACHER'
const GET_TEACHER_DETAIL_QUERY_KEY = 'GET_TEACHER_DETAIL'

type TeacherForm = BodyFormData<Teacher>

const createTeacher = (data: TeacherForm) => {
  return apiInstance.post<TeacherForm, void>(API_ENPOINTS.TEACHER, data)
}

const getTeachers = (params: SearchParams) => {
  return apiInstance.get<void, ResponseGetListApi<Teacher>>(
    API_ENPOINTS.TEACHER,
    {
      params,
    },
  )
}

const getTeacherDetail = (teacherId: number) => {
  return apiInstance.get<void, Teacher>(API_ENPOINTS.TEACHER_DETAIL(teacherId))
}

const editTeacher = (teacherId: number, data: TeacherForm) => {
  return apiInstance.put<TeacherForm, void>(
    API_ENPOINTS.TEACHER_DETAIL(teacherId),
    data,
  )
}

export const useCreateTeacher = () => {
  return useMutation<void, AxiosError, TeacherForm>({
    mutationFn: (data: TeacherForm) => createTeacher(data),
    onError: (err: AxiosError) => {
      console.log('🚀 ~ useCreateStudent ~ err:', err)
      return
    },
  })
}

export const useGetTeachers = (params: SearchParams) => {
  return useQuery<ResponseGetListApi<Teacher>, AxiosError>({
    queryKey: [GET_TEACHER_QUERY_KEY, params],
    queryFn: () => getTeachers(params),
  })
}

export const useGetTeacherDetail = (teacherId: number) => {
  return useQuery<ResponseGetDetail<Teacher>, AxiosError>({
    queryKey: [GET_TEACHER_DETAIL_QUERY_KEY, teacherId],
    queryFn: () => getTeacherDetail(teacherId),
  })
}

export const useEditTeacher = (teacherId: number) => {
  return useMutation<void, AxiosError, TeacherForm>({
    mutationFn: (data: TeacherForm) => editTeacher(teacherId, data),
  })
}
