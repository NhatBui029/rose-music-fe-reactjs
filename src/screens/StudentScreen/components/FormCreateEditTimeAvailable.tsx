import {
  Button,
  Flex,
  Form,
  FormInstance,
  Input,
  Select,
  TimePicker,
} from 'antd'
import { useEffect } from 'react'
import { Student, StudentAvailable } from 'src/types/student.type'
import { CreateEditFormProps, ResponseGetDetail } from 'src/types/common.type'
import { MdDelete } from 'react-icons/md'
import dayjs from 'dayjs'

type StudentCreateEditFormProps = CreateEditFormProps<StudentAvailable[]> & {
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
      console.log('🚀 ~ useEffect ~ data:', data)
      form.setFieldValue(
        'studentTimeAvailables',
        data.map((value) => ({
          id: value.id,
          dayOfWeek: value.dayOfWeek,
          time: [
            // dayjs(value.startTime, 'HH:mm'),
            // dayjs(value.endTime, 'HH:mm'),
            value.startTime,
            value.endTime,
          ],
          isDelete: false,
        })),
      )
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
      <Form.List name="studentTimeAvailables">
        {(fields, { add }) => (
          <>
            {fields.map(({ key, name, ...restField }) => {
              const isDeleted = form.getFieldValue([
                'studentTimeAvailables',
                name,
                'isDelete',
              ])

              if (isDeleted) return null

              return (
                <Flex align="center" key={key} gap={0}>
                  <Form.Item {...restField} name={[name, 'id']} hidden={true}>
                    <Input type="hidden" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'isDelete']}
                    hidden={true}
                  >
                    <Input type="hidden" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'dayOfWeek']}
                    rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
                    style={{ width: '40%' }}
                  >
                    <Select
                      placeholder="Thứ"
                      options={[2, 3, 4, 5, 6, 7].map((numb) => ({
                        value: numb,
                        label: `Thứ ${numb}`,
                      }))}
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

                  <Form.Item>
                    <Button
                      onClick={() => {
                        const currentData = form.getFieldValue(
                          'studentTimeAvailables',
                        )
                        const updatedData = currentData.map(
                          (item: StudentAvailable, index: number) => {
                            if (index === name) {
                              return { ...item, isDelete: true }
                            }
                            return item
                          },
                        )
                        form.setFieldValue('studentTimeAvailables', updatedData)
                      }}
                    >
                      <MdDelete />
                    </Button>
                  </Form.Item>
                </Flex>
              )
            })}
            <Button onClick={() => add()}>Thêm</Button>
          </>
        )}
      </Form.List>
    </Form>
  )
}

export default FormCreateEditTimeAvailable
