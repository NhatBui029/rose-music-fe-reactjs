import { SexEnum } from './common.type'

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
