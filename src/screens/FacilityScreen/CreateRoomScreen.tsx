import apiInstance from '../../api/apiInstance'
import { API_ENPOINTS } from '../../api/api.constants'
import { Button, Form, FormProps, Input, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import apiCloudinaryInstance from '../../api/apiCloudinaryInstance'
import { CreateRoomFormProps } from '../../types/facility.type'
import { useCreateRoom } from '../../api/api-hooks/room'
import { DrawerProps } from './CreateFacilityScreen'

const { TextArea } = Input

type CreateRoomDrawerProps = DrawerProps & {
  id: number
}
const CreateRoomScreen = ({ id, onClose }: CreateRoomDrawerProps) => {
  const { mutateAsync: createRoom, isPending = false } = useCreateRoom(id)

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      const presignedUrl: string = await apiInstance.post(
        API_ENPOINTS.URL_UPLOAD,
        {
          folder: 'room',
          eager: 'c_crop,h_200,w_260',
        },
      )

      const { name, note, upload } = values

      if (upload && upload.length > 0) {
        if (upload[0].type !== 'image/jpeg' && upload[0].type !== 'image/png') {
          message.warning('Vui lòng chọn file ảnh')
          return
        }
        const formData = new FormData()
        formData.append('file', upload[0].originFileObj)

        const responseUploadImage: Record<string, string> =
          await apiCloudinaryInstance.post(presignedUrl, formData)

        await createRoom({
          name,
          note,
          imageUrl: responseUploadImage.secure_url,
        })

        onClose()

        message.success(`Đã tạo thành công phòng học ${name}`)
      } else {
        message.error('Chưa chọn ảnh')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo phòng học mới')
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
        autoComplete="off"
      >
        <Form.Item<CreateRoomFormProps>
          label="Tên phòng học"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên cơ sở phòng học mới',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<CreateRoomFormProps> label="Ghi chú" name="note">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item<CreateRoomFormProps>
          name="upload"
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: 'Vui lòng chọn ảnh cho phòng học mới' },
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
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateRoomScreen
