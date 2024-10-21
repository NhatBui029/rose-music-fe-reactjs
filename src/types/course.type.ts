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

export type StudentCourse = {
  id: number
  studentId: number
  courseId: number
  numberOfStudiedLesson: number
  numberOfStudiedLessonExcused: number
  status: StudentCourseStatusEnum
  invoiceId: number
}

export enum StudentCourseStatusEnum {
  PENDING = 'Đang chờ',
  ACTIVE = 'Đang học',
  COMPLETED = 'Hoàn thành',
  DEFERRED = 'Bảo lưu',
}

export enum StudentLevelEnum {
  BASIC = 'Cơ bản',
  ADVANCED = 'Nâng cao',
}

export type CourseSearchParams = PaginationParams & {
  content?: string
  facilityId?: number
}
