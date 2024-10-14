import * as yup from 'yup'

const createStudentSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên'),
  nickname: yup.string().required('Vui lòng nhập biệt danh'),
  sex: yup
    .string()
    .oneOf(['BOY', 'GIRL'], 'Giới tính phải là BOY hoặc GIRL')
    .required('Vui lòng chọn giới tính'),
  dateOfBirth: yup
    .date()
    .required('Vui lòng nhập ngày sinh')
    .typeError('Ngày sinh phải có định dạng yyyy-mm-dd'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
  facilityId: yup.number().required('Vui lòng chọn cơ sở theo học'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Số điện thoại phải đúng 10 chữ số')
    .required('Vui lòng nhập số điện thoại'),
})

export default createStudentSchema
