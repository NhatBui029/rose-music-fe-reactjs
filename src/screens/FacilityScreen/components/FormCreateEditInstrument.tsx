import { Button, Form, Input, InputNumber, Select, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import {
  CreateEditFormItems,
  CreateEditFormProps,
  Instrument,
  MusicalInstrumentEnum,
  ResponseGetDetail,
  StatusInstrumentEnum,
} from '../../../types/facility.type'
import { useEffect } from 'react'
const { Option } = Select

type InstrumentCreateEditFormProps = CreateEditFormProps<
  ResponseGetDetail<Instrument>
>
const FormCreateEditInstrument = ({
  onFinish,
  normFile,
  isPending,
  data,
}: InstrumentCreateEditFormProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        type: data.type,
        countInStock: data.countInStock,
        status: data.status,
        price: data.price,
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
        <Form.Item<CreateEditFormItems<Instrument>>
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

        <Form.Item<CreateEditFormItems<Instrument>>
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

        <Form.Item<CreateEditFormItems<Instrument>>
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

        <Form.Item<CreateEditFormItems<Instrument>>
          name="upload"
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: !!!data, message: 'Vui lòng chọn ảnh cho dụng cụ mới' },
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

export default FormCreateEditInstrument
