export type CreateEditFormItems<T> = Omit<T, 'id' | 'imageUrl'> & {
  upload?: File
}

export type BodyFormData<T> = Omit<T, 'id'> & {
  facilityId?: number
}

export type ResponseGetListApi<T> = {
  data: ResponseGetDetail<T>[]
  meta?: {
    total: number
    page: number
    pageSize: number
  }
}

export type ResponseGetDetail<T> = T & {
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export type ComponentChildProps = {
  onClose: () => void
  openModal: boolean
}

export type CreateEditFormProps<T> = {
  onFinish: (values: any) => void
  data?: T
}

export enum SexEnum {
  BOY = 'Nam',
  GIRL = 'Nữ',
}

export type PaginationParams = {
  page?: number
  pageSize?: number
}
