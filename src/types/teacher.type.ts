import { SexEnum } from './common.type'

export type Teacher = {
  id: number
  name: string
  code: string
  sex: SexEnum
  phoneNumber: string
  email: string
  dateOfBirth: string
  imageUrl: string
  subjectId: number
}

export type Subject = {
  id: number
  name: string
  color: string
}
