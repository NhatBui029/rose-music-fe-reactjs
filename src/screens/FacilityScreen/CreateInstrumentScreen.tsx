import apiInstance from '../../api/apiInstance'
import { API_ENPOINTS } from '../../api/api.constants'
import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import apiCloudinaryInstance from '../../api/apiCloudinaryInstance'
import {
  CreateInstrumentFormProps,
  MusicalInstrumentEnum,
  StatusInstrumentEnum,
} from '../../types/facility.type'
import { DrawerProps } from './CreateFacilityScreen'
import { useCreateInstrument } from '../../api/api-hooks/instrument'

const { Option } = Select

type CreateInstrumentDrawerProps = DrawerProps & {
  id: number
}
const CreateInstrumentScreen = ({
  id,
  onClose,
}: CreateInstrumentDrawerProps) => {
  const { mutateAsync: createIntrument, isPending = false } =
    useCreateInstrument(id)

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      const presignedUrl: string = await apiInstance.post(
        API_ENPOINTS.URL_UPLOAD,
        {
          folder: 'instrument',
          eager: 'c_crop,h_200,w_260',
        },
      )

      const { name, price, countInStock, type, status, upload } = values

      if (upload && upload.length > 0) {
        if (upload[0].type !== 'image/jpeg' && upload[0].type !== 'image/png') {
          message.warning('Vui lòng chọn file ảnh')
          return
        }
        const formData = new FormData()
        formData.append('file', upload[0].originFileObj)

        const responseUploadImage: Record<string, string> =
          await apiCloudinaryInstance.post(presignedUrl, formData)

        await createIntrument({
          name,
          price,
          countInStock,
          type,
          status,
          imageUrl: responseUploadImage.secure_url,
        })

        onClose()

        message.success(`Đã tạo thành công dụng cụ ${name}`)
      } else {
        message.error('Chưa chọn ảnh')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo dụng cụ mới')
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
        <Form.Item<CreateInstrumentFormProps>
          label="Tên thiết bị"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên thiết bị mới',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="Loại"
          hasFeedback
          rules={[{ required: true, message: 'Vui lòng chọn loại thiết bị' }]}
        >
          <Select placeholder="Loại thiết bị">
            {Object.values(MusicalInstrumentEnum).map((value, idx) => (
              <Option value={value} key={idx}>
                {value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Tình trạng"
          hasFeedback
          rules={[
            { required: true, message: 'Vui lòng chọn tình trạng thiết bị' },
          ]}
        >
          <Select placeholder="Tình trạng thiết bị">
            {Object.keys(StatusInstrumentEnum).map((key, idx) => (
              <Option value={key} key={idx}>
                {StatusInstrumentEnum[key as keyof typeof StatusInstrumentEnum]}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<CreateInstrumentFormProps>
          label="Giá bán"
          name="price"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giá bán cho thiết bị mới',
            },
          ]}
        >
          <InputNumber addonAfter="VNĐ" defaultValue={0} />
        </Form.Item>

        <Form.Item<CreateInstrumentFormProps>
          label="Số lượng"
          name="countInStock"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số lượng thiết bị mới',
            },
          ]}
        >
          <InputNumber addonAfter="Chiếc" defaultValue={0} />
        </Form.Item>

        <Form.Item<CreateInstrumentFormProps>
          name="upload"
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: 'Vui lòng chọn ảnh cho dụng cụ mới' },
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

export default CreateInstrumentScreen
