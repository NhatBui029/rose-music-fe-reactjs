import dayjs from 'dayjs'
import { SexEnum } from 'src/types/common.type'
import { StudentLevelEnum } from 'src/types/course.type'
import { DiscountUnitEnum } from 'src/types/invoice.type'
import { StudentCourseStatusEnum } from 'src/types/student-course'

export const E2Vsex = (status: string) => {
  return SexEnum[status as unknown as keyof typeof SexEnum]
}

export const convertDate = (date: string) => {
  return dayjs(date).format('DD-MM-YYYY')
}

export const E2Vlevel = (level: string) => {
  return StudentLevelEnum[level as unknown as keyof typeof StudentLevelEnum]
}

export const E2VvoucherDiscountUnit = (level: string) => {
  return DiscountUnitEnum[level as unknown as keyof typeof DiscountUnitEnum]
}

export const E2VStudentCourseStatus = (status: string) => {
  return StudentCourseStatusEnum[
    status as unknown as keyof typeof StudentCourseStatusEnum
  ]
}
