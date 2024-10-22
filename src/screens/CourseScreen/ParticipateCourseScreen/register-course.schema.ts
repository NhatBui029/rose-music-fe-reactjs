import * as yup from 'yup'

const createRegisterCourseSchema = yup.object().shape({
  studentIds: yup
    .array()
    .of(yup.number())
    .min(1, 'Vui lòng chọn ít nhất 1 học viên')
    .required('Vui lòng chọn học viên'),
  courseIds: yup
    .array()
    .of(yup.number())
    .min(1, 'Vui lòng chọn ít nhất 1 bộ môn')
    .required('Vui lòng chọn bộ môn'),
  quantity: yup
    .number()
    .min(1, 'Vui lòng chọn số lượng ít nhất là 1')
    .required('Vui lòng chọn số lượng'),
  voucherId: yup.number(),
})

export default createRegisterCourseSchema
