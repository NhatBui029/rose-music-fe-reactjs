import { Result } from 'antd'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/route-paths.constant'

const SystemErrorScreen = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle={'Xin lỗi, có lỗi gì đó xảy ra.'}
      extra={<Link to={ROUTE_PATHS.HOME}>Quay lại trang chủ</Link>}
    />
  )
}

export default SystemErrorScreen
