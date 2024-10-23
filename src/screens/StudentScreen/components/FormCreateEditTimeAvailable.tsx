import useYupValidation from '@hooks/useYupValidation'
import { Button, DatePicker, Form, Input, Radio, Select, Upload } from 'antd'
import createStudentSchema from '../student.schema'
import dayjs from 'dayjs'
import { useGetFacilitys } from '@api/api-hooks/facility'
import { IoMdCloudUpload } from 'react-icons/io'
import { useEffect } from 'react'
import { Student } from 'src/types/student.type'
import { CreateEditFormProps, ResponseGetDetail } from 'src/types/common.type'

type StudentCreateEditFormProps = CreateEditFormProps<
  ResponseGetDetail<Student>
>

const FormCreateEditTimeAvailable = ({
  onFinish,
  data,
}: StudentCreateEditFormProps) => {
  const validationRules = useYupValidation(createStudentSchema)
  const { data: facilities } = useGetFacilitys()

  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        nickname: data.nickname,
        sex: data.sex,
        dateOfBirth: dayjs(data.dateOfBirth).format('YYYY-MM-DD'),
        address: data.address,
        email: data.email,
        facilityId: data.facilityId,
        phoneNumber: data.phoneNumber,
      })
    }
  }, [data, form])

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormCreateEditTimeAvailable
