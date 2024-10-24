import {
  Button,
  Col,
  Flex,
  Input,
  Pagination,
  Popover,
  Progress,
  Row,
  Select,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from 'antd'
import { useState } from 'react'
import RegisterCourseScreen from './RegisterCourseScreen'
import ActionOnRow from '@components/ActionOnRow/ActionOnRow'
import { useGetStudentCourses } from '@api/api-hooks/student-course'
import {
  StudentCourse,
  StudentCourseStatusColor,
  StudentCourseStatusEnum,
} from 'src/types/student-course'
import { E2VStudentCourseStatus } from 'src/utils/student-course.util'
import { SearchProps } from 'antd/es/input'
import { useGetFacilitys } from '@api/api-hooks/facility'
import { useGetCourses } from '@api/api-hooks/course'

const ParticipateCourseScreen = () => {
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [facilityId, setFacilityId] = useState<number>()
  const [courseId, setCourseId] = useState<number>()
  const [content, setContent] = useState<string>('')
  const [status, setStatus] = useState<StudentCourseStatusEnum>()
  const { data: studentCourses, refetch } = useGetStudentCourses({
    page,
    pageSize,
    facilityId,
    courseId,
    status,
    content,
  })
  const { data: facilities } = useGetFacilitys()
  const { data: courses } = useGetCourses(
    {
      facilityId,
    },
    !!facilityId,
  )

  const onOpenRegisterModal = () => {
    setIsOpenRegisterModal(true)
  }

  const onCloseRegisterModal = () => {
    setIsOpenRegisterModal(false)
    refetch()
  }

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const handleSelectFacilityChange = (facilityId: number) => {
    setFacilityId(facilityId)
  }

  const handleSelectCourseChange = (courseId: number) => {
    setCourseId(courseId)
  }

  const handleSelectStatusChange = (status: string) => {
    setStatus(status as StudentCourseStatusEnum)
  }

  const onSearchName: SearchProps['onSearch'] = (value, _e, info) => {
    setContent(value)
    console.log(info?.source)
  }

  const columns: TableColumnsType<StudentCourse> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên học viên',
      key: 'student',
      dataIndex: 'student',
      render: (student: { name: string }) => student?.name,
      sorter: {
        compare: (first, second) =>
          first.student.name.localeCompare(second.student.name),
        multiple: 3,
      },
    },
    {
      title: 'Khóa học',
      key: 'course',
      dataIndex: 'course',
      render: (course: { name: string }) => course?.name,
    },
    {
      title: 'Số buổi đã học',
      key: 'progress',
      dataIndex: 'numberOfStudiedLesson',
      render: (value, record) => {
        return (
          <Progress
            percent={Math.round((value * 100) / record.course.numberOfLesson)}
            format={() => `${value}/${record.course.numberOfLesson}`}
          />
        )
      },
    },
    {
      title: 'Số buổi đã nghỉ phép',
      key: 'numberOfStudiedLessonExcused',
      dataIndex: 'numberOfStudiedLessonExcused',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (status: keyof typeof StudentCourseStatusEnum) => (
        <Tag color={StudentCourseStatusColor[status]}>
          {StudentCourseStatusEnum[status]}
        </Tag>
      ),
    },

    {
      title: '...',
      key: 'id',
      dataIndex: 'id',
      render: (id: number) => (
        <Popover
          content={<ActionOnRow id={id} onOpenModal={() => {}} />}
          trigger="click"
          style={{ cursor: 'pointer' }}
        >
          ...
        </Popover>
      ),
    },
  ]

  return (
    <div>
      <Flex justify="space-between">
        <Typography.Title level={3}>Quản lí tiến trình học</Typography.Title>
        <Button type="primary" onClick={onOpenRegisterModal}>
          Đăng kí
        </Button>
      </Flex>
      <Flex
        style={{ marginTop: 10, marginBottom: 20 }}
        align="center"
        justify="space-between"
      >
        <Input.Search
          style={{ width: '20%' }}
          allowClear
          onSearch={onSearchName}
          placeholder="Tìm kiếm học viên theo tên"
        />
        <Select
          placeholder="Chọn cơ sở"
          style={{ width: '10%' }}
          allowClear
          onChange={handleSelectFacilityChange}
        >
          {facilities &&
            facilities.data.map((facility) => (
              <Select.Option value={facility.id} key={facility.id}>
                {facility.name}
              </Select.Option>
            ))}
        </Select>
        <Select
          placeholder="Chọn khoá học"
          style={{ width: '13%' }}
          allowClear
          onChange={handleSelectCourseChange}
        >
          {courses &&
            courses.data.map((course) => (
              <Select.Option value={course.id} key={course.id}>
                {course.name}
              </Select.Option>
            ))}
        </Select>
        <Select
          placeholder="Trạng thái"
          style={{ width: '10%' }}
          allowClear
          onChange={handleSelectStatusChange}
        >
          {Object.keys(StudentCourseStatusEnum).map((status, idx) => (
            <Select.Option key={idx} value={status}>
              {E2VStudentCourseStatus(status)}
            </Select.Option>
          ))}
        </Select>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={studentCourses?.meta?.total}
          showSizeChanger={true}
          pageSizeOptions={['10', '20', '50', '100']}
          showTotal={(total) => `Tổng số: ${total}`}
          onChange={handlePaginationChange}
        />
      </Flex>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={studentCourses?.data}
            rowKey={(record) => record.id}
            pagination={false}
          />
        </Col>
      </Row>

      <RegisterCourseScreen
        onClose={onCloseRegisterModal}
        openModal={isOpenRegisterModal}
      />
      {/* <EditCourseScreeen
        onClose={onEditCloseModal}
        id={courseId}
        openModal={isEditModalOpen}
      /> */}
    </div>
  )
}

export default ParticipateCourseScreen
