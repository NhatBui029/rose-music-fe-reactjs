import {
  Button,
  Col,
  Flex,
  Popover,
  Row,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from 'antd'
import { useState } from 'react'
import CreateStudentCourseScreen from './CreateStudentCourseScreen'
import EditCourseScreeen from './EditCourseScreeen'
import { ResponseGetDetail } from 'src/types/common.type'
import { useGetSubjects } from '@api/api-hooks/subject'
import { Subject } from 'src/types/teacher.type'
import { useGetCourses } from '@api/api-hooks/course'
import { Course, StudentLevelEnum } from 'src/types/course.type'
import { E2Vlevel } from 'src/utils/course.util'
import { Facility } from 'src/types/facility.type'
import { useGetFacilitys } from '@api/api-hooks/facility'
import ActionOnRow from '@components/ActionOnRow/ActionOnRow'

const StudentCourseScreen = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const { data: subjects } = useGetSubjects()
  const { data: facilities } = useGetFacilitys()
  const [courseId, setCourseId] = useState<number>(1)

  const { data: courses, refetch } = useGetCourses()

  const showCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const onCreateCloseModal = () => {
    setIsCreateModalOpen(false)
    refetch()
  }

  const showEditModal = (id: number) => {
    setCourseId(id)
    setIsEditModalOpen(true)
  }

  const onEditCloseModal = () => {
    setIsEditModalOpen(false)
    refetch()
  }

  const columns: TableColumnsType<ResponseGetDetail<Course>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      key: 'name',
      dataIndex: 'name',
      sorter: {
        compare: (first, second) => first.name.localeCompare(second.name),
        multiple: 3,
      },
    },
    {
      title: 'Trình độ',
      key: 'level',
      dataIndex: 'level',
      render: (level: string) => E2Vlevel(level),
      filters: Object.keys(StudentLevelEnum).map((level) => ({
        text: E2Vlevel(level),
        value: level,
      })),
      onFilter: (value, record) => record.level === value,
    },
    {
      title: 'Giá tiền',
      key: 'price',
      dataIndex: 'price',
      sorter: {
        compare: (first, second) => first.price - second.price,
      },
    },
    {
      title: 'Số buổi học',
      key: 'numberOfLesson',
      dataIndex: 'numberOfLesson',
    },
    {
      title: 'Số buổi nghỉ phép',
      key: 'numberOfLessonExcused',
      dataIndex: 'numberOfLessonExcused',
    },
    {
      title: 'Thời lượng buổi học',
      key: 'duration',
      dataIndex: 'duration',
      render: (duration: string) => `${duration} phút`,
    },
    {
      title: 'Bộ môn',
      key: 'subjectId',
      dataIndex: 'subjectId',
      render: (subjectId: number) => (
        <Tag
          color={
            subjects?.data.find((subject: Subject) => subject.id === subjectId)
              ?.color
          }
        >
          {
            subjects?.data.find((subject: Subject) => subject.id === subjectId)
              ?.name
          }
        </Tag>
      ),
      filters: subjects?.data.map((subject: Subject) => ({
        text: subject.name,
        value: subject.id,
      })),
      onFilter: (value, record) => record.subjectId === value,
    },
    {
      title: 'Cơ sở',
      key: 'facilityId',
      dataIndex: 'facilityId',
      render: (facilityId: number) => (
        <Tag
          color={
            facilities?.data.find(
              (facility: Facility) => facility.id === facilityId,
            )?.color
          }
        >
          {
            facilities?.data.find(
              (facility: Facility) => facility.id === facilityId,
            )?.name
          }
        </Tag>
      ),
      filters: facilities?.data.map((facility: Facility) => ({
        text: facility.name,
        value: facility.id,
      })),
      onFilter: (value, record) => record.facilityId === value,
    },
    {
      title: '...',
      key: 'id',
      dataIndex: 'id',
      render: (id: number) => (
        <Popover
          content={<ActionOnRow id={id} onOpenModal={showEditModal} />}
          trigger="click"
        >
          ...
        </Popover>
      ),
    },
  ]

  return (
    <div>
      <Flex justify="space-between">
        <Typography.Title level={3}>
          Quản lí thông tin khóa học
        </Typography.Title>
        <Button type="primary" onClick={showCreateModal}>
          Thêm
        </Button>
      </Flex>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={courses?.data}
            rowKey={(record) => record.id}
            pagination={false}
          />
        </Col>
        {/* <Col span={6}>
          <Flex style={{ width: '30%' }}>side</Flex>
        </Col> */}
      </Row>

      <CreateStudentCourseScreen
        onClose={onCreateCloseModal}
        openModal={isCreateModalOpen}
      />
      <EditCourseScreeen
        onClose={onEditCloseModal}
        id={courseId}
        openModal={isEditModalOpen}
      />
    </div>
  )
}

export default StudentCourseScreen
