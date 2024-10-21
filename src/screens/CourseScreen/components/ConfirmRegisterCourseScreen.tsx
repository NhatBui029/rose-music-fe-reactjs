import { Descriptions, Typography } from 'antd'
import useRegisterCourseStore from '@stores/register-course.store'
import { useGetStudents } from '@api/api-hooks/student'
import { useGetCourses } from '@api/api-hooks/course'
import { useEffect, useState } from 'react'

const ConfirmRegisterCourseScreen = () => {
  const { data } = useRegisterCourseStore()
  const [students, setStudents] = useState<string[]>([])
  const [courses, setCourses] = useState<string[]>([])
  const { data: studentsData } = useGetStudents({
    // ids: data?.students ?? [],
  })
  const { data: coursesData } = useGetCourses({
    // ids: data?.courses ?? [],
  })

  //   useEffect(() => {
  //     if (studentsData) {
  //       setStudents(studentsData.map((student) => student.name))
  //     }
  //     if (coursesData) {
  //       setCourses(coursesData.map((course) => course.name))
  //     }
  //   }, [studentsData, coursesData])

  const totalAmount = 2
  const discount = data?.voucherId ? 500 : 0

  return (
    <>
      <Typography.Title level={4}>Xác nhận đăng ký</Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Học viên">
          {students.join(', ')}
        </Descriptions.Item>
        <Descriptions.Item label="Khoá học">
          {courses.join(', ')}
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng">{data?.quantity}</Descriptions.Item>
        <Descriptions.Item label="Ưu đãi">{discount} VNĐ</Descriptions.Item>
        <Descriptions.Item label="Tổng tiền">
          {totalAmount - discount} VNĐ
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}

export default ConfirmRegisterCourseScreen
