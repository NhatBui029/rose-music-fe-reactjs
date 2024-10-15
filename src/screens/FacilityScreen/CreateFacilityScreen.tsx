import apiInstance from '../../api/apiInstance'
import { API_ENPOINTS } from '../../api/api.constants'
import { Button, Form, FormProps, Input, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import apiCloudinaryInstance from '../../api/apiCloudinaryInstance'
import {
  CreateEditFormItems,
  ComponentChildProps,
  Facility,
} from '../../types/facility.type'
import { useCreateFacility } from '../../api/api-hooks/facility'

const { TextArea } = Input

const CreateFacilityScreen = ({ onClose }: ComponentChildProps) => {
  const { mutateAsync: createFacility, isPending = false } = useCreateFacility()

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      const presignedUrl: string = await apiInstance.post(
        API_ENPOINTS.URL_UPLOAD,
        {
          folder: 'facility',
          eager: 'c_crop,h_200,w_260',
        },
      )

      const { name, address, upload } = values

      if (upload && upload.length > 0) {
        if (upload[0].type !== 'image/jpeg' && upload[0].type !== 'image/png') {
          message.warning('Vui lòng chọn file ảnh')
          return
        }
        const formData = new FormData()
        formData.append('file', upload[0].originFileObj)

        const responseUploadImage: Record<string, string> =
          await apiCloudinaryInstance.post(presignedUrl, formData)

        await createFacility({
          name,
          address,
          imageUrl: responseUploadImage.secure_url,
        })

        onClose()

        message.success(`Đã tạo thành công cơ sở ${name}`)
      } else {
        message.error('Chưa chọn ảnh')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo cơ sở mới')
    }
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<CreateEditFormItems<Facility>>
          label="Tên cơ sở"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên cơ sở mới' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<CreateEditFormItems<Facility>>
          label="Địa chỉ"
          name="address"
          rules={[
            { required: true, message: 'Vui lòng nhập địa chỉ cơ sở mới' },
          ]}
        >
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item<CreateEditFormItems<Facility>>
          name="upload"
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="Chọn ảnh đại diện cho trung tâm"
          rules={[
            { required: true, message: 'Vui lòng chọn ảnh cho cơ sở mới' },
          ]}
        >
          <Upload
            name="logo"
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateFacilityScreen
