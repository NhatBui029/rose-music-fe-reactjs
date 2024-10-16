import {
  Avatar,
  Button,
  Col,
  Flex,
  Input,
  Modal,
  Popover,
  Row,
  Space,
  Table,
  TableColumnType,
  TableColumnsType,
  Tag,
  Typography,
} from 'antd'
import { useState } from 'react'
import CreateStudentScreeen from './CreateStudentScreeen'
import { useGetStudents } from '@api/api-hooks/student'
import { SexEnum, Student } from 'src/types/student.type'
import { E2Vsex, convertDate } from 'src/utils/student.util'
import { ResponseGetDetail } from 'src/types/facility.type'
import { useGetFacilitys } from '@api/api-hooks/facility'
import { FaSearch } from 'react-icons/fa'
import { useDebounce } from '@hooks/useDebounce'
import ActionOnRow from './components/ActionOnRow'
import EditStudentScreeen from './EditStudentScreeen'

const StudentScreen = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data: facilities } = useGetFacilitys()
  const [studentId, setStudentId] = useState<number>(1)

  const debouncedSearchText = useDebounce(searchText, 500)

  const { data: students, refetch } = useGetStudents({
    content: debouncedSearchText,
    searchBy: 'name',
    page: currentPage,
    pageSize,
  })

  const showCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const onCreateCloseModal = () => {
    setIsCreateModalOpen(false)
    refetch()
  }

  const showEditModal = (id: number) => {
    setStudentId(id)
    setIsEditModalOpen(true)
  }

  const onEditCloseModal = () => {
    setIsEditModalOpen(false)
    refetch()
  }

  const handleSearch = () => {
    setCurrentPage(1)
  }

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
    refetch()
  }

  const getColumnSearchProps = (): TableColumnType<
    ResponseGetDetail<Student>
  > => ({
    filterDropdown: ({ close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder="Tìm kiếm"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
          onPressEnter={(e) => console.log(e)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={handleSearch}
            size="small"
            style={{ width: 90 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => {
              setSearchText('')
              refetch()
            }}
            size="small"
            style={{ width: 90 }}
          >
            Xóa
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <FaSearch style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    render: (text) => text,
  })

  const columns: TableColumnsType<ResponseGetDetail<Student>> = [
    {
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text: string) => <Avatar src={text} />,
    },
    {
      title: 'Mã học viên',
      dataIndex: 'code',
      key: 'code',
      sorter: {
        compare: (first, second) => first.code.localeCompare(second.code),
        multiple: 3,
      },
    },
    {
      title: 'Tên',
      key: 'name',
      dataIndex: 'name',
      ...getColumnSearchProps(),
      sorter: {
        compare: (first, second) => first.name.localeCompare(second.name),
        multiple: 3,
      },
    },
    {
      title: 'Ngày sinh',
      key: 'dateOfBirth',
      dataIndex: 'dateOfBirth',
      sorter: {
        compare: (first, second) =>
          first.dateOfBirth.localeCompare(second.dateOfBirth),
      },
      render: (date: string) => convertDate(date),
    },
    {
      title: 'Giới tính',
      key: 'sex',
      dataIndex: 'sex',
      render: (sex: string) => E2Vsex(sex),
      filters: Object.keys(SexEnum).map((sex) => ({
        text: E2Vsex(sex),
        value: sex,
      })),
      onFilter: (value, record) => record.sex === value,
    },
    {
      title: 'Số điện thoại',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Cơ sở',
      key: 'facilityId',
      dataIndex: 'facilityId',
      render: (facilityId: number) => (
        <Tag color="pink">
          {
            facilities?.data.find((facility) => facility.id === facilityId)
              ?.name
          }
        </Tag>
      ),
      filters: facilities?.data.map((facility) => ({
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
        <Typography.Title level={3}>Quản lí học viên</Typography.Title>
        <Button type="primary" onClick={showCreateModal}>
          Thêm
        </Button>
      </Flex>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={students?.data}
            rowKey={(record) => record.id}
            pagination={{
              current: currentPage,
              pageSize,
              total: students?.meta?.total,
              position: ['topRight'],
            }}
            onChange={handleTableChange}
          />
        </Col>
        {/* <Col span={6}>
          <Flex style={{ width: '30%' }}>side</Flex>
        </Col> */}
      </Row>

      <Modal
        title="Thêm học viên mới"
        open={isCreateModalOpen}
        footer={false}
        onCancel={onCreateCloseModal}
      >
        <CreateStudentScreeen onClose={onCreateCloseModal} />
      </Modal>
      <Modal
        title="Thay đổi thông tin học viên"
        open={isEditModalOpen}
        footer={false}
        onCancel={onEditCloseModal}
      >
        <EditStudentScreeen onClose={onEditCloseModal} id={studentId} />
      </Modal>
    </div>
  )
}

export default StudentScreen
