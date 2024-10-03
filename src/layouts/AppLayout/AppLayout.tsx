import { useState } from 'react'
import { Button, Layout, Menu, MenuProps } from 'antd'
import { ROUTE_PATHS } from '../../routes/route-paths.constant'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { IoIosLogOut } from 'react-icons/io'
import {
  IoBook,
  IoHome,
  IoMenuOutline,
  IoNotificationsSharp,
} from 'react-icons/io5'
import './style.css'
import { FaUserGraduate, FaUserTie, FaUsers } from 'react-icons/fa'
import { BsFillHousesFill } from 'react-icons/bs'
import { RiCalendarScheduleFill } from 'react-icons/ri'
import { SiCashapp } from 'react-icons/si'
import { TbReportAnalytics } from 'react-icons/tb'

const AppLayout = () => {
  // const setCurrentUser = useAppStore((stage) => stage.setCurrentUser)
  const location = useLocation()
  const { pathname } = location
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev)
  }

  const sideMenuItems: MenuProps['items'] = [
    {
      key: ROUTE_PATHS.HOME,
      label: <Link to={ROUTE_PATHS.HOME}>Trang chủ</Link>,
      icon: <IoHome />,
    },
    {
      key: 'grp1',
      label: 'Quản lí tài nguyên',
      type: 'group',
      children: [
        {
          key: ROUTE_PATHS.TEACHER,
          label: <Link to={ROUTE_PATHS.TEACHER}>Giáo viên</Link>,
          icon: <FaUserTie />,
        },
        {
          key: ROUTE_PATHS.STUDENT,
          label: <Link to={ROUTE_PATHS.STUDENT}>Học viên</Link>,
          icon: <FaUserGraduate />,
        },
        {
          key: ROUTE_PATHS.ACCOUNT,
          label: <Link to={ROUTE_PATHS.ACCOUNT}>Tài khoản</Link>,
          icon: <MdAccountBalanceWallet />,
        },
        {
          key: ROUTE_PATHS.FACILITY,
          label: <Link to={ROUTE_PATHS.FACILITY}>Cơ sở</Link>,
          icon: <BsFillHousesFill />,
        },
      ],
    },
    {
      key: 'grp2',
      label: 'Quản lí giảng dạy',
      type: 'group',
      children: [
        {
          key: ROUTE_PATHS.COURSE,
          label: <Link to={ROUTE_PATHS.COURSE}>Khóa học</Link>,
          icon: <IoBook />,
        },
        {
          key: ROUTE_PATHS.CALENDAR,
          label: <Link to={ROUTE_PATHS.CALENDAR}>Lịch học</Link>,
          icon: <RiCalendarScheduleFill />,
        },
        {
          key: ROUTE_PATHS.ATTENDANCE,
          label: <Link to={ROUTE_PATHS.ATTENDANCE}>Theo dõi điểm danh</Link>,
          icon: <FaUsers />,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: ROUTE_PATHS.FINANCE,
      label: <Link to={ROUTE_PATHS.FINANCE}>Quản lí tài chính</Link>,
      icon: <SiCashapp />,
    },
    {
      key: ROUTE_PATHS.REPORT,
      label: <Link to={ROUTE_PATHS.REPORT}>Xuất báo cáo</Link>,
      icon: <TbReportAnalytics />,
    },

    {
      key: ROUTE_PATHS.NOTICE,
      label: <Link to={ROUTE_PATHS.NOTICE}>Thông báo</Link>,
      icon: <IoNotificationsSharp />,
    },
  ]

  const { Header, Content, Sider } = Layout
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: 'white',
          }}
        >
          <Link to={ROUTE_PATHS.HOME}>
            <span
              style={{
                backgroundColor: '#f0f0f0',
                padding: '0.75rem',
                border: '1px solid #e0e0e0',
                borderRadius: '0.25rem',
              }}
            >
              ROSE MUSIC
            </span>
          </Link>
          <Button icon={<IoIosLogOut />} href={ROUTE_PATHS.LOGIN}>
            Đăng xuất
          </Button>
        </Header>
        <Layout
          style={{
            padding: '1.25rem',
            gap: '1.25rem',
          }}
        >
          <Sider
            // width={280}
            collapsed={collapsed}
            className="app-layout-sider"
          >
            <Menu
              mode="inline"
              items={sideMenuItems}
              selectedKeys={[pathname]}
              style={{ backgroundColor: 'white' }}
            />
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{ width: 50 }}
            >
              <IoMenuOutline />
            </Button>
          </Sider>
          <Layout>
            <Content>
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '1.25rem',
                  height: '100%',
                }}
              >
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

export default AppLayout
