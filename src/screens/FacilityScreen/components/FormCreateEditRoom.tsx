import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  Upload,
} from 'antd'
import {
  CreateEditFormItems,
  CreateEditFormProps,
  ResponseGetDetail,
  Room,
} from '../../../types/facility.type'
import { useEffect } from 'react'
import { useGetInstruments } from '../../../api/api-hooks/instrument'
import { useParams } from 'react-router-dom'
import useYupValidation from '../../../hooks/useYupValidation'
import { createRoomSchema } from '../room/room.schema'
import { MdDelete } from 'react-icons/md'
import { E2VstatusInstrument } from '../../../utils/facility.util'
import { IoMdCloudUpload } from 'react-icons/io'

const { TextArea } = Input

type RoomCreateEditFormProps = CreateEditFormProps<ResponseGetDetail<Room>>
const FormCreateEditRoom = ({ onFinish, data }: RoomCreateEditFormProps) => {
  const { facilityId } = useParams()
  const { data: instrumentOptions } = useGetInstruments(Number(facilityId))
  const [form] = Form.useForm()
  const validationRule = useYupValidation(createRoomSchema(instrumentOptions))

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        note: data.note,
        roomInstruments: data?.roomInstruments?.map((roomInstrument) => {
          return {
            instrumentId: roomInstrument.instrumentId,
            quantity: roomInstrument.quantity,
          }
        }),
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
            <Button icon={<IoMdCloudUpload />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.List name="roomInstruments">
          {(fields, { add, remove }) => (
            <>
              <Row gutter={[8, 8]} style={{ marginBottom: 10 }}>
                <Col span={19}>
                  <Typography.Title level={5}>
                    Danh sách nhạc cụ
                  </Typography.Title>
                </Col>
                <Col span={5}>
                  <Button onClick={() => add()}>Thêm</Button>
                </Col>
              </Row>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={[8, 8]} key={key}>
                  <Col span={14}>
                    <Form.Item
                      {...restField}
                      name={[name, 'instrumentId']}
                      rules={[
                        { required: true, message: 'Vui lòng nhập dụng cụ' },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Chọn nhạc cụ"
                        optionFilterProp="label"
                        style={{ width: 300 }}
                        options={instrumentOptions?.data.map((inst) => {
                          const status = E2VstatusInstrument(inst.status)
                          return {
                            value: inst.id,
                            label: `${inst.name}(${status}-${inst.countInStock})`,
                          }
                        })}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      {...restField}
                      name={[name, 'quantity']}
                      rules={[validationRule]}
                      initialValue={1}
                    >
                      <InputNumber min={1} style={{ width: 100 }} />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item>
                      <Button onClick={() => remove(name)}>
                        <MdDelete />
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form.List>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormCreateEditRoom
