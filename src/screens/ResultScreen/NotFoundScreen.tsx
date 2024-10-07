import { Result } from 'antd'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/route-paths.constant'

const NotFoundScreen = () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle={'Xin lỗi, trang không tồn tại.'}
        extra={<Link to={ROUTE_PATHS.HOME}>Quay lại trang chủ</Link>}
      />
      <Result
        status="404"
        title="404"
        subTitle={'Xin lỗi, trang không tồn tại.'}
        extra={<Link to={ROUTE_PATHS.HOME}>Quay lại trang chủ</Link>}
      />
      <Result
        status="404"
        title="404"
        subTitle={'Xin lỗi, trang không tồn tại.'}
        extra={<Link to={ROUTE_PATHS.HOME}>Quay lại trang chủ</Link>}
      />
    </>
  )
}

export default NotFoundScreen
