import { Button, Form, Input, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import {
  CreateEditFormItems,
  CreateEditFormProps,
  ResponseGetDetail,
  Room,
} from '../../../types/facility.type'
import { useEffect } from 'react'

const { TextArea } = Input

type RoomCreateEditFormProps = CreateEditFormProps<ResponseGetDetail<Room>>
const FormCreateEditRoom = ({
  onFinish,
  normFile,
  isPending,
  data,
}: RoomCreateEditFormProps) => {
  const [form] = Form.useForm()

  // Khi `data` có sự thay đổi, form sẽ được cập nhật giá trị
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        note: data.note,
      })
    }
  }, [data, form])
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<CreateEditFormItems<Room>>
          label="Tên phòng học"
          name="name"
          initialValue={data?.name}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên cơ sở phòng học mới',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<CreateEditFormItems<Room>>
          label="Ghi chú"
          name="note"
          initialValue={data?.note}
        >
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item<CreateEditFormItems<Room>>
          name="upload"
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: !!!data,
              message: 'Vui lòng chọn ảnh cho phòng học mới',
            },
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

export default FormCreateEditRoom
