import { Button, Card, Drawer, Flex, Image, Typography } from 'antd'
import { BsEyeFill, BsHouseCheck } from 'react-icons/bs'
import { MdModeEditOutline } from 'react-icons/md'
import { Link, generatePath } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/route-paths.constant'
import { useState } from 'react'
import CreateFacilityScreen from './CreateFacilityScreen'
import { useGetFacilitys } from '../../api/api-hooks/facility'

const { Meta } = Card

const FacilityScreen = () => {
  const [open, setOpen] = useState(false)
  const { data: facilityData, refetch } = useGetFacilitys()

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    refetch()
    setOpen(false)
  }
  return (
    <div>
      <Flex justify="space-between">
        <Typography.Title level={2}>Danh sách cơ sở</Typography.Title>
        <Button onClick={showDrawer}>Thêm</Button>
      </Flex>
      <Flex justify="space-around" wrap gap={30}>
        {facilityData?.data.map((facility, index) => (
          <Card
            key={index}
            style={{ width: 300 }}
            cover={<Image alt="example" src={facility.imageUrl} />}
            actions={[
              <Link
                to={generatePath(ROUTE_PATHS.FACILITY_DETAIL, {
                  facilityId: facility.id ,
                })}
              >
                <BsEyeFill key="view" />
              </Link>,
              <MdModeEditOutline key="edit" />,
            ]}
          >
            <Meta
              avatar={<BsHouseCheck />}
              title={facility.name}
              description={facility.address}
            />
          </Card>
        ))}
      </Flex>
      <Drawer title="Tạo cơ sở mới" onClose={onClose} open={open} width={500}>
        <CreateFacilityScreen onClose={onClose} />
      </Drawer>
    </div>
  )
}

export default FacilityScreen
