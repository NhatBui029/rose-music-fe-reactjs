import { Button, Flex, Modal, Table, Typography } from 'antd'
import { useState } from 'react'
import CreateStudentScreeen from './CreateStudentScreeen'
import { useGetStudents } from '@api/api-hooks/student'
import { Student } from 'src/types/student.type'
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '10%',
    sorter: {
      compare: (first: Student, second: Student) => first.id - second.id,
      multiple: 3,
    },
  },
  {
    title: 'Mã học viên',
    dataIndex: 'code',
    key: 'code',
    // width: '10%',
    sorter: {
      compare: (first: Student, second: Student) =>
        first.code.localeCompare(second.code),
      multiple: 3,
    },
  },

  {
    title: 'Nhiệt độ',
    key: 'temperature',
    dataIndex: 'temperature',
    // sorter: {
    //   compare: (a, b) => a.temperature - b.temperature,
    //   multiple: 3,
    // },
  },
  {
    title: 'Độ ẩm',
    key: 'humidity',
    dataIndex: 'humidity',
    // sorter: {
    //   compare: (a, b) => a.humidity - b.humidity,
    //   multiple: 3,
    // },
  },
  {
    title: 'Ánh sáng',
    key: 'light',
    dataIndex: 'light',
    // sorter: {
    //   compare: (a, b) => a.light - b.light,
    //   multiple: 3,
    // },
  },
  {
    title: 'Gas',
    key: 'Gas',
    dataIndex: 'gas',
    // sorter: {
    //   compare: (a, b) => a.gas - b.gas,
    //   multiple: 3,
    // },
  },
  {
    title: 'Thời gian',
    key: 'time',
    dataIndex: 'time',
    // sorter: {
    //   compare: (a, b) => a.time.toString().localeCompare(b.time.toString()),
    //   multiple: 3,
    // },
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
