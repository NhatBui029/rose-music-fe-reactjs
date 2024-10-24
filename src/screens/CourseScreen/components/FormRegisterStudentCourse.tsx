import useYupValidation from '@hooks/useYupValidation'
import {
  Form,
  FormInstance,
  FormProps,
  InputNumber,
  Select,
  message,
} from 'antd'
import { useState } from 'react'
import './style.css'
import { DebounceSelect, SearchValue } from './SearchSelect'
import { useGetCourses } from '@api/api-hooks/course'
import { useGetVouchers } from '@api/api-hooks/voucher'
import createRegisterCourseSchema from '../ParticipateCourseScreen/register-course.schema'
import useRegisterCourseStore from '@stores/register-course.store'
import { RegisterCourseDataCreate } from 'src/types/student-course'
import { E2VvoucherDiscountUnit } from 'src/utils/student-course.util'

type RegisterCourseFormProps = {
  form: FormInstance
}

const FormRegisterCourse = ({ form }: RegisterCourseFormProps) => {
  const validationRules = useYupValidation(createRegisterCourseSchema)
  const { setRegisterCourseData } = useRegisterCourseStore()
  const [student, setStudent] = useState<SearchValue>()
  const { data: courses } = useGetCourses(
    {
      facilityId: student?.value,
    },
    !!student,
  )
  const { data: vouchers } = useGetVouchers(
    {
      facilityId: student?.value,
      isAvailable: true,
    },
    !!student,
  )

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      console.log("🚀 ~ constonFinish:FormProps['onFinish']= ~ values:", values)
      setRegisterCourseData(values as RegisterCourseDataCreate)
      // message.success(`Đã thêm thành công khóa học ${values.name}`)
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm khóa học mới')
    }
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Form.Item label="Học viên" name="studentIds" rules={[validationRules]}>
        <DebounceSelect
          mode="multiple"
          value={student}
          placeholder="Tìm kiếm"
          onChange={(newTudent) => {
            setStudent(newTudent)
          }}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Khoá học" name="courseIds" rules={[validationRules]}>
        <Select placeholder="Chọn khoá học" mode="multiple">
          {courses &&
            courses.data.map((course) => (
              <Select.Option value={course.id} key={course.id}>
                {course.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item label="Số lượng" name="quantity" rules={[validationRules]}>
        <InputNumber addonAfter="Khóa" min={1} />
      </Form.Item>

      <Form.Item label="Ưu đãi" name="voucherId" rules={[validationRules]}>
        <Select placeholder="Chọn khoá học" allowClear>
          {vouchers &&
            vouchers.data.map((voucher) => (
              <Select.Option value={voucher.id} key={voucher.id}>
                {`${voucher.name} (${voucher.discount}${E2VvoucherDiscountUnit(voucher.discountUnit)})`}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

export default FormRegisterCourse
