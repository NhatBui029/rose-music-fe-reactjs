import { Avatar, Button, Flex, Modal, Table, Typography } from 'antd'
import { useState } from 'react'
import CreateStudentScreeen from './CreateStudentScreeen'
import { useGetStudents } from '@api/api-hooks/student'
import { Student } from 'src/types/student.type'
const columns = [
  {
    // title: 'ID',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: (text: string) => {
      return <Avatar src={text} />
    },
  },
  {
    title: 'Mã học viên',
    dataIndex: 'code',
    key: 'code',
    // width: '15%',
    sorter: {
      compare: (first: Student, second: Student) =>
        first.code.localeCompare(second.code),
      multiple: 3,
    },
  },
  {
    title: 'Tên',
    key: 'name',
    dataIndex: 'name',
    sorter: {
      compare: (first: Student, second: Student) =>
        first.name.localeCompare(second.name),
      multiple: 3,
    },
  },
  {
    title: 'Ngày sinh',
    key: 'dateOfBirth',
    dataIndex: 'dateOfBirth',
    sorter: {
      compare: (first: Student, second: Student) =>
        first.dateOfBirth.localeCompare(second.dateOfBirth),
      multiple: 3,
    },
  },
  {
    title: 'Giới tính',
    key: 'sex',
    dataIndex: 'sex',
    sorter: {
      compare: (first: Student, second: Student) =>
        first.sex.localeCompare(second.sex),
      multiple: 3,
    },
  },
  {
    title: 'Số điện thoại',
    key: 'phoneNumber',
    dataIndex: 'phoneNumber',
    sorter: {
      compare: (first: Student, second: Student) =>
        first.phoneNumber.localeCompare(second.phoneNumber),
      multiple: 3,
    },
  },
]
const StudentScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: students } = useGetStudents()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <Flex justify="space-between">
        <Typography.Title level={3}>Quản lí học viên</Typography.Title>
        <Button type="primary" onClick={showModal}>
          Thêm
        </Button>
      </Flex>
      <Table
        columns={columns}
        dataSource={students?.data}
        pagination={{
          position: ['topRight'],
          current: 1,
          pageSize: 10,
          total: 50,
          //   current: filter.page,
          //   pageSize: filter.pageSize,
          //   total: totalCount,
        }}
        className="ant-border-space"
        onChange={(pagination, _filters, _sorter, _extra) => {
          //   setPage({
          //     page: pagination.current,
          //     pageSize: pagination.pageSize,
          //   })
        }}
      />
      <Modal
        title="Thêm học viên mới"
        open={isModalOpen}
        footer={false}
        onCancel={onCloseModal}
      >
        <CreateStudentScreeen onClose={onCloseModal} />
      </Modal>
    </div>
  )
}

export default StudentScreen
