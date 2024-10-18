import useYupValidation from '@hooks/useYupValidation'
import { Button, Form, Input, InputNumber, Radio, Select } from 'antd'
import createCourseSchema from '../course.schema'
import { useEffect } from 'react'
import { CreateEditFormProps, ResponseGetDetail } from 'src/types/common.type'
import { Subject } from 'src/types/teacher.type'
import { useGetSubjects } from '@api/api-hooks/subject'
import { Course, StudentLevelEnum } from 'src/types/course.type'
import { E2Vlevel } from 'src/utils/course.util'
import TextArea from 'antd/es/input/TextArea'
import { useGetFacilitys } from '@api/api-hooks/facility'

type CourseCreateEditFormProps = CreateEditFormProps<ResponseGetDetail<Course>>

const FormCreateEditCourse = ({
  onFinish,
  data,
}: CourseCreateEditFormProps) => {
  const validationRules = useYupValidation(createCourseSchema)
  const { data: subjects } = useGetSubjects()
  const { data: facilities } = useGetFacilitys()

  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        duration: data.duration,
        numberOfLesson: data.numberOfLesson,
        numberOfLessonExcused: data.numberOfLessonExcused,
        price: data.price,
        description: data.description,
        level: data.level,
        subjectId: data.subjectId,
        facilityId: data.facilityId,
      })
    }
  }, [data, form])

  return (
    <Form
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Form.Item label="Tên khóa học" name="name" rules={[validationRules]}>
        <Input />
      </Form.Item>

      <Form.Item label="Trình độ" name="level" rules={[validationRules]}>
        <Radio.Group>
          {Object.keys(StudentLevelEnum).map((level, index) => (
            <Radio value={level} key={index}>
              {E2Vlevel(level)}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Giá khóa học" name="price" rules={[validationRules]}>
        <InputNumber addonAfter="VNĐ" defaultValue={1} step={100000} />
      </Form.Item>
      <Form.Item
        label="Số buổi học"
        name="numberOfLesson"
        rules={[validationRules]}
      >
        <InputNumber addonAfter="buổi" defaultValue={12} />
      </Form.Item>
      <Form.Item
        label="Số buổi nghỉ phép"
        name="numberOfLessonExcused"
        rules={[validationRules]}
      >
        <InputNumber addonAfter="buổi" defaultValue={2} />
      </Form.Item>
      <Form.Item label="Thời lượng" name="duration" rules={[validationRules]}>
        <InputNumber addonAfter="phút" defaultValue={60} step={30} />
      </Form.Item>
      <Form.Item label="Mô tả" name="description">
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Bộ môn" name="subjectId" rules={[validationRules]}>
        <Select placeholder="Chọn bộ môn">
          {subjects?.data.map((subject: Subject) => (
            <Select.Option value={subject.id} key={subject.id}>
              {subject.name}
            </Select.Option>
          ))}
        </Select>
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormCreateEditCourse
