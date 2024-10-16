import useYupValidation from '@hooks/useYupValidation'
import { Button, DatePicker, Form, Input, Radio, Select, Upload } from 'antd'
import createStudentSchema from '../student.schema'
import dayjs from 'dayjs'
import { useGetFacilitys } from '@api/api-hooks/facility'
import { IoMdCloudUpload } from 'react-icons/io'
import { useEffect } from 'react'
import { CreateEditFormProps, ResponseGetDetail } from 'src/types/facility.type'
import { Student } from 'src/types/student.type'

type StudentCreateEditFormProps = CreateEditFormProps<
  ResponseGetDetail<Student>
>

const FormCreateEditStudent = ({
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

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Form.Item label="Họ và Tên" name="name" rules={[validationRules]}>
        <Input />
      </Form.Item>
      <Form.Item label="Biệt danh" name="nickname" rules={[validationRules]}>
        <Input />
      </Form.Item>

      <Form.Item label="Giới tính" name="sex" rules={[validationRules]}>
        <Radio.Group>
          <Radio value="BOY"> Nam </Radio>
          <Radio value="GIRL"> Nữ </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Ngày sinh"
        name="dateOfBirth"
        rules={[validationRules]}
        getValueProps={(value) => ({
          value: value ? dayjs(value, 'YYYY-MM-DD') : null,
        })}
        normalize={(value) =>
          value ? dayjs(value).format('YYYY-MM-DD') : null
        }
      >
        <DatePicker format="YYYY-MM-DD" placeholder="Ngày sinh" />
      </Form.Item>

      <Form.Item label="Địa chỉ" name="address" rules={[validationRules]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[validationRules]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="SĐT" name="phoneNumber" rules={[validationRules]}>
        <Input.OTP length={10} />
      </Form.Item>
      <Form.Item label="Cơ sở" name="facilityId" rules={[validationRules]}>
        <Select placeholder="Chọn cơ sở">
          {facilities?.data.map((facility) => (
            <Select.Option value={facility.id} key={facility.id}>
              {facility.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="upload"
        label="Hình ảnh"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          name="logo"
          listType="picture"
          beforeUpload={() => false}
          maxCount={1}
        >
          <Button icon={<IoMdCloudUpload />}>Chọn ảnh</Button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormCreateEditStudent
