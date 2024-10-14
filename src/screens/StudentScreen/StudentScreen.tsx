import { Button, Flex, Modal, Table, Typography } from 'antd'
import { useState } from 'react'
import CreateStudentScreeen from './CreateStudentScreeen'
const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    width: '10%',
    // sorter: {
    //   compare: (a, b) => a.stt - b.stt,
    //   multiple: 3,
    // },
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    // sorter: {
    //   compare: (a, b) => a.id - b.id,
    //   multiple: 3,
    // },
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

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
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
        dataSource={[]}
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
        onCancel={handleCancel}
      >
        <CreateStudentScreeen />
      </Modal>
    </div>
  )
}

export default StudentScreen
