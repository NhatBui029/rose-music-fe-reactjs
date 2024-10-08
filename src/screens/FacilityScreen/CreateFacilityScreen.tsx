import apiInstance from '../../api/apiInstance'
import { API_ENPOINTS } from '../../api/api.constants'
import { Button, Form, FormProps, Input, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import apiCloudinaryInstance from '../../api/apiCloudinaryInstance'

const CreateFacilityScreen = () => {
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
        const formData = new FormData()
        formData.append('file', upload[0].originFileObj)

        const { secure_url }: { secure_url: string } =
          await apiCloudinaryInstance.post(presignedUrl, formData)

        await apiInstance.post(API_ENPOINTS.FACILITY, {
          name,
          address,
          imageUrl: secure_url,
        })
      } else {
        message.success('Tải ảnh lên cloud thành công')
      }

      message.success(`Đã tạo thành công cơ sở ${name}`)
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
        <Form.Item
          label="Tên cơ sở"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="Chọn ảnh đại diện cho trung tâm"
        >
          <Upload
            name="logo"
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to select file</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateFacilityScreen
