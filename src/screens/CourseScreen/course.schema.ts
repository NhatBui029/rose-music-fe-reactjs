import { StudentLevelEnum } from 'src/types/course.type'
import * as yup from 'yup'

const createCourseSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên khoá học'),
  subjectId: yup.number().required('Vui lòng chọn bộ môn'),
  facilityId: yup.number().required('Vui lòng chọn cơ sở'),
  duration: yup.number().required('Vui lòng nhập thời gian buổi học'),
  numberOfLessonExcused: yup.number().required('Vui lòng nhập số buổi học'),
  numberOfLesson: yup.number().required('Vui lòng nhập số buổi nghỉ có phép'),
  price: yup.number().required('Vui lòng nhập giá tiền'),
  description: yup.string(),
  level: yup
    .mixed()
    .oneOf(Object.values(StudentLevelEnum))
    .required('Level là bắt buộc'),
})

export default createCourseSchema
