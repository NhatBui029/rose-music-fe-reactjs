import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  BodyFormData,
  ResponseGetDetail,
  ResponseGetListApi,
} from 'src/types/common.type'
import { Voucher, VoucherSearchParams } from 'src/types/invoice.type'

const GET_VOUCHER_QUERY_KEY = 'GET_VOUCHER'
const GET_VOUCHER_DETAIL_QUERY_KEY = 'GET_VOUCHER_DETAIL'

type VoucherForm = BodyFormData<Voucher>

const createVoucher = (data: VoucherForm) => {
  return apiInstance.post<VoucherForm, void>(API_ENPOINTS.VOUCHER, data)
}

const getVouchers = (params: VoucherSearchParams) => {
  return apiInstance.get<void, ResponseGetListApi<Voucher>>(
    API_ENPOINTS.VOUCHER,
    {
      params,
    },
  )
}

const getVoucherDetail = (voucherId: number) => {
  return apiInstance.get<void, Voucher>(API_ENPOINTS.VOUCHER_DETAIL(voucherId))
}

const editVoucher = (voucherId: number, data: VoucherForm) => {
  return apiInstance.put<VoucherForm, void>(
    API_ENPOINTS.VOUCHER_DETAIL(voucherId),
    data,
  )
}

export const useCreateVoucher = () => {
  return useMutation<void, AxiosError, VoucherForm>({
    mutationFn: (data: VoucherForm) => createVoucher(data),
    onError: (err: AxiosError) => {
      console.log('🚀 ~ useCreateStudent ~ err:', err)
      return
    },
  })
}

export const useGetVouchers = (
  params: VoucherSearchParams,
  enabled: boolean,
) => {
  return useQuery<ResponseGetListApi<Voucher>, AxiosError>({
    queryKey: [GET_VOUCHER_QUERY_KEY, params],
    queryFn: () => getVouchers(params),
    enabled,
    staleTime: 2 * 60 * 1000,
  })
}

export const useGetVoucherDetail = (
  voucherId: number,
  enabled: boolean = true,
) => {
  return useQuery<ResponseGetDetail<Voucher>, AxiosError>({
    queryKey: [GET_VOUCHER_DETAIL_QUERY_KEY, voucherId],
    queryFn: () => getVoucherDetail(voucherId),
    enabled,
    // staleTime: 2 * 60 * 1000,
  })
}

export const useEditVoucher = (voucherId: number) => {
  return useMutation<void, AxiosError, VoucherForm>({
    mutationFn: (data: VoucherForm) => editVoucher(voucherId, data),
  })
}
