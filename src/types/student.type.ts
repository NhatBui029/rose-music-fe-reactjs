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
}

export type StudentAvailable = {
  id: number
  studentId: number
  dayOfWeek: number
  startTime: string
  endTime: string
  priority: number
}

export type StudentSearchParams = PaginationParams & {
  content?: string
  ids?: number[]
}
