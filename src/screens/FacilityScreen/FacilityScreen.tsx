import { Button, Card, Flex, Typography } from 'antd'
import { BsHouseCheck } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdModeEditOutline } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/route-paths.constant'

const { Meta } = Card

const FacilityScreen = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Flex justify="space-between">
        <Typography.Title level={2}>Danh sách cơ sở</Typography.Title>
        <Button onClick={() => navigate(ROUTE_PATHS.FACILITY_CREATE)}>
          Thêm
        </Button>
      </Flex>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <Link to={ROUTE_PATHS.HOME}>
            <IoSettingsOutline key="setting" />
          </Link>,
          <MdModeEditOutline key="edit" />,
        ]}
      >
        <Meta
          avatar={<BsHouseCheck />}
          title="Rose music 1"
          description="Kiến An"
        />
      </Card>
    </div>
  )
}

export default FacilityScreen
