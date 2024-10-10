import { Button, Col, Drawer, Flex, Image, Row, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { useGetFacilityDetail } from '../../api/api-hooks/facility'
import { useState } from 'react'
import CreateRoomScreen from './CreateRoomScreen'

const { Text, Title } = Typography
const FacilityDetailScreen = () => {
  const { id } = useParams()
  const { data: facility } = useGetFacilityDetail(Number(id))
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <Row gutter={20}>
      <Col span={14}>
        <Flex vertical gap={20}>
          <Image src={facility?.imageUrl} />
          <Text>{facility?.name}</Text>
          <Text>{facility?.address}</Text>
        </Flex>
      </Col>
      <Col span={10}>
        <Flex justify="space-around">
          <Title level={3}>Danh sách phòng học</Title>
          <Button onClick={showDrawer}>Thêm</Button>
        </Flex>
        <Drawer
          title="Tạo phòng học mới"
          onClose={onClose}
          open={open}
          width={500}
        >
          <CreateRoomScreen id={Number(id)} onClose={onClose} />
        </Drawer>
      </Col>
    </Row>
  )
}

export default FacilityDetailScreen
