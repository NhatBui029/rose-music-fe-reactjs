import { PaginationParams } from './common.type'
import { Course } from './course.type'
import { Student } from './student.type'

export type RegisterCourseDataCreate = {
  studentIds: number[]
  courseIds: number[]
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
  student: Student
  course: Course
}

export enum StudentCourseStatusEnum {
  PENDING = 'Đang chờ',
  ACTIVE = 'Đang học',
  COMPLETED = ' Hoàn thành',
  DEFERRED = 'Bảo lưu',
}

export enum StudentCourseStatusColor {
  PENDING = '#FFA500',
  ACTIVE = '#4CAF50',
  COMPLETED = '#008CBA',
  DEFERRED = '#FF6347',
}

export type StudentCourseSearchParams = PaginationParams & {
  studentId?: number
  courseId?: number
  status?: StudentCourseStatusEnum
}
