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
import CreateTeacherScreeen from './CreateTeacherScreeen'
import { FaSearch } from 'react-icons/fa'
import EditTeacherScreeen from './EditTeacherScreeen'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { ResponseGetDetail, SexEnum } from 'src/types/common.type'
import { useGetSubjects } from '@api/api-hooks/subject'
import { Subject, Teacher } from 'src/types/teacher.type'
import { useGetTeachers } from '@api/api-hooks/teacher'
import { convertDate, E2Vsex } from 'src/utils/student-course.util'
import ActionOnRow from '@components/ActionOnRow/ActionOnRow'

const TeacherScreen = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const searchInput = useRef<InputRef>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data: subjects } = useGetSubjects()
  const [teacherId, setTeacherId] = useState<number>(1)

  const { data: teachers, refetch } = useGetTeachers({
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
    setTeacherId(id)
    setIsEditModalOpen(true)
  }

  const onEditCloseModal = () => {
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
    ResponseGetDetail<Teacher>
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

  const columns: TableColumnsType<ResponseGetDetail<Teacher>> = [
    {
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text: string) => <Avatar src={text} />,
    },
    {
      title: 'Mã giảng viên',
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
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      sorter: {
        compare: (first, second) => first.email.localeCompare(second.email),
      },
    },
    {
      title: 'Số điện thoại',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
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
        <Typography.Title level={3}>Quản lí giảng viên</Typography.Title>
        <Button type="primary" onClick={showCreateModal}>
          Thêm
        </Button>
      </Flex>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={teachers?.data}
            rowKey={(record) => record.id}
            pagination={{
              current: currentPage,
              pageSize,
              total: teachers?.meta?.total,
              position: ['topRight'],
            }}
            onChange={handleTableChange}
          />
        </Col>
        {/* <Col span={6}>
          <Flex style={{ width: '30%' }}>side</Flex>
        </Col> */}
      </Row>

      <CreateTeacherScreeen
        onClose={onCreateCloseModal}
        openModal={isCreateModalOpen}
      />
      <EditTeacherScreeen
        onClose={onEditCloseModal}
        id={teacherId}
        openModal={isEditModalOpen}
      />
    </div>
  )
}

export default TeacherScreen
