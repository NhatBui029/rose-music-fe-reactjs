import {
  Button,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select,
  TimePicker,
} from 'antd'
import { useEffect } from 'react'
import { Student } from 'src/types/student.type'
import { CreateEditFormProps, ResponseGetDetail } from 'src/types/common.type'
import { MdDelete } from 'react-icons/md'
import dayjs from 'dayjs'

type StudentCreateEditFormProps = CreateEditFormProps<
  ResponseGetDetail<Student>
> & {
  form: FormInstance
}
const { RangePicker } = TimePicker
const FormCreateEditTimeAvailable = ({
  onFinish,
  data,
  form,
}: StudentCreateEditFormProps) => {
  useEffect(() => {
    if (data) {
      form.setFieldsValue({})
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
      <Form.List name="studentAvailables">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Flex align="center" key={key} gap={0}>
                <Form.Item
                  {...restField}
                  name={[name, 'id']}
                  hidden={true} // Field id hidden
                >
                  <Input type="hidden" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'isDelete']}
                  hidden={true} // Field isDelete hidden
                >
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'date']}
                  rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
                  style={{ width: '50%' }}
                >
                  <Select
                    placeholder="Ngày trong tuần"
                    options={[2, 3, 4, 5, 6, 7].map((numb) => {
                      return {
                        value: numb,
                        label: `Thứ ${numb}`,
                      }
                    })}
                  />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'time']}
                  rules={[
                    { required: true, message: 'Vui lòng chọn thời gian' },
                  ]}
                  getValueProps={(value) => ({
                    value: value
                      ? [dayjs(value[0], 'HH:mm'), dayjs(value[1], 'HH:mm')]
                      : [],
                  })}
                  normalize={(value) =>
                    value
                      ? [
                          dayjs(value[0]).format('HH:mm'),
                          dayjs(value[1]).format('HH:mm'),
                        ]
                      : []
                  }
                >
                  <RangePicker placeholder={['Từ', 'Đến']} format="hh:mm" />
                </Form.Item>

                <Form.Item name="priority">
                  <InputNumber placeholder="Ưu tiên" />
                </Form.Item>

                <Form.Item>
                  <Button onClick={() => remove(name)}>
                    <MdDelete />
                  </Button>
                </Form.Item>
              </Flex>
            ))}
            <Button onClick={() => add()}>Thêm</Button>
          </>
        )}
      </Form.List>
    </Form>
  )
}

export default FormCreateEditTimeAvailable
