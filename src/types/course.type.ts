import { PaginationParams } from './common.type'

export type Course = {
  id: number
  name: string
  duration: number
  numberOfLesson: number
  numberOfLessonExcused: number
  price: number
  description?: string
  level: StudentLevelEnum
  subjectId: number
  facilityId: number
}

export enum StudentLevelEnum {
  BASIC = 'Cơ bản',
  ADVANCED = 'Nâng cao',
}

export type CourseSearchParams = PaginationParams & {
  content?: string
  facilityId?: number
  ids?: number[]
}
