import * as yup from 'yup'

const createTeacherSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên'),
  sex: yup
    .string()
    .oneOf(['BOY', 'GIRL'], 'Giới tính phải là BOY hoặc GIRL')
    .required('Vui lòng chọn giới tính'),
  dateOfBirth: yup
    .date()
    .required('Vui lòng nhập ngày sinh')
    .typeError('Ngày sinh phải có định dạng yyyy-mm-dd'),
  subjectId: yup.number().required('Vui lòng chọn bộ môn'),
  email: yup.string().email('Email không hợp lệ'),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Số điện thoại phải đúng 10 chữ số')
    .required('Vui lòng nhập số điện thoại'),
})

export default createTeacherSchema
