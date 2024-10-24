import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BodyFormData, ResponseGetListApi } from 'src/types/common.type'
import {
  Student,
  StudentAvailable,
  StudentSearchParams,
} from 'src/types/student.type'

const GET_STUDENT_QUERY_KEY = 'GET_STUDENT'
const GET_STUDENT_DETAIL_QUERY_KEY = 'GET_STUDENT_DETAIL'

type StudentForm = BodyFormData<Student>
type StudentTimeAvailableForm = {
  studentTimeAvailables: StudentAvailable[]
}

const createStudent = (data: StudentForm) => {
  return apiInstance.post<StudentForm, Student>(API_ENPOINTS.STUDENT, data)
}

const createStudentTimeAvailable = (data: StudentTimeAvailableForm) => {
  return apiInstance.put<StudentForm, void>(
    API_ENPOINTS.STUDENT_TIME_AVAILABLE,
    data,
  )
}

const getStudents = (params: StudentSearchParams) => {
  return apiInstance.get<void, ResponseGetListApi<Student>>(
    API_ENPOINTS.STUDENT,
    {
      params,
    },
  )
}

const getStudentDetail = (studentId: number) => {
  return apiInstance.get<void, Student>(API_ENPOINTS.STUDENT_DETAIL(studentId))
}

const editStudent = (studentId: number, data: StudentForm) => {
  return apiInstance.put<StudentForm, void>(
    API_ENPOINTS.STUDENT_DETAIL(studentId),
    data,
  )
}

export const useCreateStudent = () => {
  return useMutation<Student, AxiosError, StudentForm>({
    mutationFn: (data: StudentForm) => createStudent(data),
    onError: (err: AxiosError) => {
      console.log('🚀 ~ useCreateStudent ~ err:', err)
      return
    },
  })
}

export const useCreateStudentTimeAvailable = () => {
  return useMutation<void, AxiosError, StudentTimeAvailableForm>({
    mutationFn: (data: StudentTimeAvailableForm) =>
      createStudentTimeAvailable(data),
    onError: (err: AxiosError) => {
      console.log('🚀 ~ useCreateStudent ~ err:', err)
      return
    },
  })
}

export const useGetStudents = (
  params: StudentSearchParams,
  enabled: boolean = true,
) => {
  return useQuery<ResponseGetListApi<Student>, AxiosError>({
    queryKey: [GET_STUDENT_QUERY_KEY, params],
    queryFn: () => getStudents(params),
    enabled,
  })
}

export const useGetStudentDetail = (studentId: number) => {
  return useQuery<Student, AxiosError>({
    queryKey: [GET_STUDENT_DETAIL_QUERY_KEY, studentId],
    queryFn: () => getStudentDetail(studentId),
  })
}

export const useEditStudent = (studentId: number) => {
  return useMutation<void, AxiosError, StudentForm>({
    mutationFn: (data: StudentForm) => editStudent(studentId, data),
  })
}
