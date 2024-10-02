import { Button, Flex, Layout, Menu, MenuProps } from 'antd'
import { ROUTE_PATHS } from '../routes/route-paths.constant'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useAppStore from '../stores/app.store'
import { MdPerson } from 'react-icons/md'
import { IoIosLogOut } from 'react-icons/io'
import { useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'

const AppLayout = () => {
  const setCurrentUser = useAppStore((stage) => stage.setCurrentUser)
  const location = useLocation()
  const { pathname } = location
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev)
  }

  const topMenuItems: MenuProps['items'] = [
    {
      key: 'userProfile',
      label: 'Thông tin',
      icon: <MdPerson />,
      children: [
        {
          key: 'logout',
          label: 'Đăng xuất',
          icon: <IoIosLogOut />,
          onClick: () => {
            setCurrentUser(null)
          },
        },
      ],
    },
  ]

  const sideMenuItems: MenuProps['items'] = [
    {
      key: ROUTE_PATHS.HOME,
      label: <Link to={ROUTE_PATHS.HOME}>Trang chủ</Link>,
      icon: <IoMenuOutline />,
    },
    {
      key: ROUTE_PATHS.TEACHER,
      label: <Link to={ROUTE_PATHS.TEACHER}>Quản lí giáo viên</Link>,
      icon: <IoMenuOutline />,
    },
    {
      key: ROUTE_PATHS.STUDENT,
      label: <Link to={ROUTE_PATHS.STUDENT}>Quản lí học viên</Link>,
      icon: <IoMenuOutline />,
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
          <Menu theme="light" mode="horizontal" items={topMenuItems} />
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
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <Menu
              mode="inline"
              items={sideMenuItems}
              selectedKeys={[pathname]}
              style={{ backgroundColor: 'transparent' }}
            />
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{ position: 'fixed', bottom: 10 }}
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
