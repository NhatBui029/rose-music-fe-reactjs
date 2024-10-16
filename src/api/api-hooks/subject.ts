import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ResponseGetListApi } from 'src/types/common.type'
import { Subject } from 'src/types/teacher.type'

const GET_SUBJECT_QUERY_KEY = 'GET_SUBJECT_QUERY_KEY'
const getSubjects = () => {
  return apiInstance.get<void, ResponseGetListApi<Subject>>(
    API_ENPOINTS.SUBJECT,
  )
}

export const useGetSubjects = () => {
  return useQuery<ResponseGetListApi<Subject>, AxiosError>({
    queryKey: [GET_SUBJECT_QUERY_KEY],
    queryFn: () => getSubjects(),
  })
}
