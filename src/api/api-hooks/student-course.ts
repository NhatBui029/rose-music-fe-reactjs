import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ResponseGetDetail, ResponseGetListApi } from 'src/types/common.type'
import { StudentCourse } from 'src/types/course.type'
import { Invoice } from 'src/types/invoice.type'
import {
  RegisterCourseDataCreate,
  StudentCourseSearchParams,
} from 'src/types/student-course'

const GET_STUDENT_COURSE_QUERY_KEY = 'GET_STUDENT_COURSE'
const GET_STUDENT_COURSE_DETAIL_QUERY_KEY = 'GET_STUDENT_COURSE_DETAIL'

type StudentCourseForm = RegisterCourseDataCreate | null

const createStudentCourse = (data: StudentCourseForm) => {
  return apiInstance.post<StudentCourseForm, ResponseGetDetail<Invoice>>(
    API_ENPOINTS.STUDENT_COURSE,
    data,
  )
}

const getStudentCourses = (params: StudentCourseSearchParams) => {
  return apiInstance.get<void, ResponseGetListApi<StudentCourse>>(
    API_ENPOINTS.STUDENT_COURSE,
    {
      params,
    },
  )
}

const getStudentCourseDetail = (studentCourseId: number) => {
  return apiInstance.get<void, StudentCourse>(
    API_ENPOINTS.STUDENT_COURSE_DETAIL(studentCourseId),
  )
}

const editStudentCourse = (
  studentCourseId: number,
  data: StudentCourseForm,
) => {
  return apiInstance.put<StudentCourseForm, void>(
    API_ENPOINTS.STUDENT_COURSE_DETAIL(studentCourseId),
    data,
  )
}

export const useCreateStudentCourse = () => {
  return useMutation<ResponseGetDetail<Invoice>, AxiosError, StudentCourseForm>(
    {
      mutationFn: (data: StudentCourseForm) => createStudentCourse(data),
      onError: (err: AxiosError) => {
        console.log('🚀 ~ useCreateStudent ~ err:', err)
        return
      },
    },
  )
}

export const useGetStudentCourses = (
  params: StudentCourseSearchParams,
  enabled: boolean,
) => {
  return useQuery<ResponseGetListApi<StudentCourse>, AxiosError>({
    queryKey: [GET_STUDENT_COURSE_QUERY_KEY, params],
    queryFn: () => getStudentCourses(params),
    enabled,
    staleTime: 2 * 60 * 1000,
  })
}

export const useGetStudentCourseDetail = (
  studentCourseId: number,
  enabled: boolean = true,
) => {
  return useQuery<ResponseGetDetail<StudentCourse>, AxiosError>({
    queryKey: [GET_STUDENT_COURSE_DETAIL_QUERY_KEY, studentCourseId],
    queryFn: () => getStudentCourseDetail(studentCourseId),
    enabled,
    // staleTime: 2 * 60 * 1000,
  })
}

export const useEditStudentCourse = (studentCourseId: number) => {
  return useMutation<void, AxiosError, StudentCourseForm>({
    mutationFn: (data: StudentCourseForm) =>
      editStudentCourse(studentCourseId, data),
  })
}
