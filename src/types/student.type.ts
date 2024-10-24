import { PaginationParams, SexEnum } from './common.type'

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
  studentAvailables?: StudentAvailable[]
}

export type StudentAvailable = {
  id: number | undefined
  studentId: number
  dayOfWeek: number
  startTime: string
  endTime: string
  isDelete: boolean | undefined
}

export type StudentSearchParams = PaginationParams & {
  content?: string
  ids?: number[]
}
