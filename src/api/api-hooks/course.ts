import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  BodyFormData,
  ResponseGetDetail,
  ResponseGetListApi,
} from 'src/types/common.type'
import { Course, CourseSearchParams } from 'src/types/course.type'

const GET_COURSE_QUERY_KEY = 'GET_COURSE'
const GET_COURSE_DETAIL_QUERY_KEY = 'GET_COURSE_DETAIL'

type CourseForm = BodyFormData<Course>

const createCourse = (data: CourseForm) => {
  return apiInstance.post<CourseForm, void>(API_ENPOINTS.COURSE, data)
}

const getCourses = (searchParams?: CourseSearchParams) => {
  return apiInstance.get<void, ResponseGetListApi<Course>>(
    API_ENPOINTS.COURSE,
    {
      params: searchParams,
    },
  )
}

const getCourseDetail = (courseId: number) => {
  return apiInstance.get<void, Course>(API_ENPOINTS.COURSE_DETAIL(courseId))
}

const editCourse = (courseId: number, data: CourseForm) => {
  return apiInstance.put<CourseForm, void>(
    API_ENPOINTS.COURSE_DETAIL(courseId),
    data,
  )
}

export const useCreateCourse = () => {
  return useMutation<void, AxiosError, CourseForm>({
    mutationFn: (data: CourseForm) => createCourse(data),
    onError: (err: AxiosError) => {
      console.log('🚀 ~ useCreateStudent ~ err:', err)
      return
    },
  })
}

export const useGetCourses = (
  searchParams?: CourseSearchParams,
  enabled: boolean = true,
) => {
  return useQuery<ResponseGetListApi<Course>, AxiosError>({
    queryKey: [GET_COURSE_QUERY_KEY, searchParams],
    queryFn: () => getCourses(searchParams),
    enabled,
  })
}

export const useGetCourserDetail = (courseId: number) => {
  return useQuery<ResponseGetDetail<Course>, AxiosError>({
    queryKey: [GET_COURSE_DETAIL_QUERY_KEY, courseId],
    queryFn: () => getCourseDetail(courseId),
  })
}

export const useEditCourse = (courseId: number) => {
  return useMutation<void, AxiosError, CourseForm>({
    mutationFn: (data: CourseForm) => editCourse(courseId, data),
  })
}
