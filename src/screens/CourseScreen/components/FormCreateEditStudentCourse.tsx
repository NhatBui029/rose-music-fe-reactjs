import useYupValidation from '@hooks/useYupValidation'
import { Button, Form, Select } from 'antd'
import createCourseSchema from '../InfoCourseScreen/course.schema'
import { useEffect, useState } from 'react'
import { CreateEditFormProps, ResponseGetDetail } from 'src/types/common.type'
import { useGetSubjects } from '@api/api-hooks/subject'
import { StudentCourse } from 'src/types/course.type'
import { useGetFacilitys } from '@api/api-hooks/facility'
import './style.css'
import { DebounceSelect, UserValue } from './SearchSelect'
type StudentCourseCreateEditFormProps = CreateEditFormProps<
  ResponseGetDetail<StudentCourse>
>

const FormCreateEditStudentCourse = ({
  onFinish,
  data,
}: StudentCourseCreateEditFormProps) => {
  const validationRules = useYupValidation(createCourseSchema)
  const { data: subjects } = useGetSubjects()
  const { data: facilities } = useGetFacilitys()
  const [form] = Form.useForm()
  const [student, setStudent] = useState<UserValue>()

  // useEffect(() => {
  //   if (data) {
  //     form.setFieldsValue({
  //       name: data.name,
  //       duration: data.duration,
  //       numberOfLesson: data.numberOfLesson,
  //       numberOfLessonExcused: data.numberOfLessonExcused,
  //       price: data.price,
  //       description: data.description,
  //       level: data.level,
  //       subjectId: data.subjectId,
  //       facilityId: data.facilityId,
  //     })
  //   }
  // }, [data, form])

  useEffect(() => {
    console.log(form.getFieldValue('studentId'))
  }, [form.getFieldValue('studentId')])

  return (
    <Form
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Form.Item label="Học viên" name="studentId">
        <DebounceSelect
          value={student}
          placeholder="Tìm kiếm"
          onChange={(newTudent) => {
            setStudent(newTudent)
          }}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Khoá học" name="courseId">
        <Select placeholder="Chọn khoá học">
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

export default FormCreateEditStudentCourse
