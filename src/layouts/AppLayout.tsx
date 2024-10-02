import { MenuProps } from 'antd'
import { ROUTE_PATHS } from '../routes/route-paths.constant'
import { Link, Outlet } from 'react-router-dom'
import useAppStore from '../stores/app.store'
import { MdPerson } from 'react-icons/md'
import { IoIosLogOut } from 'react-icons/io'

const AppLayout = () => {
  const setCurrentUser = useAppStore((stage) => stage.setCurrentUser)

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

  const subMenuItems: MenuProps['items'] = [
    {
      key: ROUTE_PATHS.HOME,
      label: <Link to={ROUTE_PATHS.HOME}>Trang chủ</Link>,
    },
    {
      key: ROUTE_PATHS.TEACHER,
      label: <Link to={ROUTE_PATHS.TEACHER}>Quản lí giáo viên</Link>,
    },
    {
      key: ROUTE_PATHS.STUDENT,
      label: <Link to={ROUTE_PATHS.STUDENT}>Quản lí học viên</Link>,
    },
  ]
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AppLayout
