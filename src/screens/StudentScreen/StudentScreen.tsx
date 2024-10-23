import {
  Avatar,
  Button,
  Col,
  Flex,
  Input,
  InputRef,
  Popover,
  Row,
  Space,
  Table,
  TableColumnType,
  TableColumnsType,
  Tag,
  Typography,
} from 'antd'
import { useRef, useState } from 'react'
import CreateStudentScreeen from './CreateStudentScreeen'
import { useGetStudents } from '@api/api-hooks/student'
import { Student } from 'src/types/student.type'
import { E2Vsex, convertDate } from 'src/utils/student.util'
import { useGetFacilitys } from '@api/api-hooks/facility'
import { FaSearch } from 'react-icons/fa'
import EditStudentScreeen from './EditStudentScreeen'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { ResponseGetDetail, SexEnum } from 'src/types/common.type'
import { Facility } from 'src/types/facility.type'
import ActionOnRow from '@components/ActionOnRow/ActionOnRow'

const StudentScreen = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [searchText, setSearchText] = useState('')
  const searchInput = useRef<InputRef>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data: facilities } = useGetFacilitys()
  const [studentId, setStudentId] = useState<number>(1)

  const { data: students, refetch } = useGetStudents({
    page: currentPage,
    pageSize,
  })

  const onOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const onCloseCreateModal = () => {
    setIsCreateModalOpen(false)
    refetch()
  }

  const onOpenEditModal = (id: number) => {
    setStudentId(id)
    setIsEditModalOpen(true)
  }

  const onCloseEditModal = () => {
    setIsEditModalOpen(false)
    refetch()
  }

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
    refetch()
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (): TableColumnType<
    ResponseGetDetail<Student>
  > => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
            icon={<FaSearch />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <FaSearch style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record.name
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) => text,
    // <Highlighter
    //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //   searchWords={[searchText]}
    //   autoEscape
    //   textToHighlight={text ? text.toString() : ''}
    // />
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
      title: 'Biệt danh',
      key: 'nickname',
      dataIndex: 'nickname',
      render: (nickname: string) => nickname || '-',
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
          content={<ActionOnRow id={id} onOpenModal={onOpenEditModal} />}
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
        <Button type="primary" onClick={onOpenCreateModal}>
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

      <CreateStudentScreeen
        onClose={onCloseCreateModal}
        openModal={isCreateModalOpen}
      />
      <EditStudentScreeen
        onClose={onCloseEditModal}
        id={studentId}
        openModal={isEditModalOpen}
      />
    </div>
  )
}

export default StudentScreen
