export type Student = {
  id: number
  name: string
  code: string
  nickname?: string
  address: string
  sex: SexEnum
  phoneNumber: string
  email?: string
  dateOfBirth: string
  imageUrl: string
  facilityId?: number
}

export enum SexEnum {
  BOY = 'Nam',
  GIRL = 'Nữ',
}

export type SearchParams = {
  content?: string
  searchBy?: string
  page?: number
  pageSize?: number
}
