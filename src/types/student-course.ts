import { PaginationParams } from './common.type'

export type RegisterCourseDataCreate = {
  students: number[]
  courses: number[]
  quantity: number
  voucherId: number | undefined
}

export type StudentCourse = {
  id: number
  studentId: number
  courseId: number
  status: StudentCourseStatusEnum
  numberOfStudiedLesson: number
  numberOfStudiedLessonExcused: number
}

enum StudentCourseStatusEnum {
  PENDING = 'Đang chờ',
  ACTIVE = 'Đang học',
  COMPLETED = ' Hoàn thành',
  DEFERRED = 'Bảo lưu',
}

export type StudentCourseSearchParams = PaginationParams & {
  studentId?: number
  courseId?: number
  status?: StudentCourseStatusEnum
}
