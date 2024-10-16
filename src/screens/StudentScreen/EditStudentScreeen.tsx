import useYupValidation from '@hooks/useYupValidation'
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  message,
  Radio,
  Select,
  Upload,
} from 'antd'

import { IoMdCloudUpload } from 'react-icons/io'
import createStudentSchema from './student.schema'
import apiCloudinaryInstance from '@api/apiCloudinaryInstance'
import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import dayjs from 'dayjs'
import { useGetFacilitys } from '@api/api-hooks/facility'
import { useEditStudent, useGetStudentDetail } from '@api/api-hooks/student'
import { ComponentChildProps } from 'src/types/facility.type'
import { useEffect } from 'react'

const EditStudentScreeen = ({
  onClose,
  id,
}: ComponentChildProps & { id: number }) => {
  const validationRules = useYupValidation(createStudentSchema)
  const { data: facilities } = useGetFacilitys()
  const { mutateAsync: editStudent } = useEditStudent(id)
  const { data: student } = useGetStudentDetail(id)
  const [form] = Form.useForm()

  useEffect(() => {
    if (student) {
      form.setFieldsValue({
        name: student.name,
        nickname: student.nickname,
        sex: student.sex,
        dateOfBirth: dayjs(student.dateOfBirth).format('YYYY-MM-DD'),
        address: student.address,
        email: student.email,
        facilityId: student.facilityId,
        phoneNumber: student.phoneNumber,
      })
    }
  }, [student, form])
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      let imageUrl = import.meta.env.VITE_API_DEFAULT_IMAGE_URL
      const { upload, ...data } = values

      if (upload && upload.length > 0) {
        if (upload[0].type !== 'image/jpeg' && upload[0].type !== 'image/png') {
          message.warning('Vui lòng chọn file ảnh')
          return
        }
        const presignedUrl: string = await apiInstance.post(
          API_ENPOINTS.URL_UPLOAD,
          {
            folder: 'student',
            eager: 'c_crop,h_200,w_260',
          },
        )
        const formData = new FormData()
        formData.append('file', upload[0].originFileObj)

        const responseUploadImage: Record<string, string> =
          await apiCloudinaryInstance.post(presignedUrl, formData)

        imageUrl = responseUploadImage.secure_url
      } else {
        imageUrl = student?.imageUrl
      }
      await editStudent({
        ...data,
        imageUrl,
      })

      onClose()
      message.success(`Đã sửa thông tin học viên ${data.name} thành công`)
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm học viên mới')
    }
  }
  return (
    <div>
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
          // initialValue={dayjs('2024-01-23').format('YYYY-MM-DD')}
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
    </div>
  )
}

export default EditStudentScreeen
