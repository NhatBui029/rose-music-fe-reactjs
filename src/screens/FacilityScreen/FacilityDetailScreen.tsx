import { Button, Col, Flex, Image, Row, Typography } from 'antd'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useGetFacilityDetail } from '../../api/api-hooks/facility'
import ListInstrument from './components/ListInstrument'
import ListRoom, { IconText } from './components/ListRoom'
import { useGetRooms } from '../../api/api-hooks/room'
import { FaLocationDot } from 'react-icons/fa6'
import { useGetInstruments } from '../../api/api-hooks/instrument'
import { ROUTE_PATHS } from '../../routes/route-paths.constant'

const { Title } = Typography

const FacilityDetailScreen = () => {
  const { facilityId } = useParams()
  const navigate = useNavigate()
  const { data: rooms } = useGetRooms(Number(facilityId))
  const { data: instruments } = useGetInstruments(Number(facilityId))
  const { data: facility } = useGetFacilityDetail(Number(facilityId))

  const redirectToCreateRoom = () => {
    navigate(
      generatePath(ROUTE_PATHS.ROOM_CREATE, {
        facilityId,
      }),
    )
  }

  const redirectToInstrumentRoom = () => {
    navigate(
      generatePath(ROUTE_PATHS.INSTRUMENT_CREATE, {
        facilityId,
      }),
    )
  }

  return (
    <>
      <Row gutter={20}>
        <Col span={12}>
          <Flex vertical gap={20}>
            <Image src={facility?.imageUrl} />
            <Flex justify="space-between" align="center">
              <Title level={3}>{facility?.name}</Title>
              <IconText icon={FaLocationDot} text={facility?.address} />
            </Flex>
            <Flex justify="space-between">
              <Title level={5}>Danh sách thiết bị</Title>
              <Button onClick={redirectToInstrumentRoom}>Thêm</Button>
            </Flex>
            <ListInstrument data={instruments} />
          </Flex>
        </Col>
        <Col span={12}>
          <Flex justify="space-between">
            <Title level={4}>Danh sách phòng học</Title>
            <Button onClick={redirectToCreateRoom}>Thêm</Button>
          </Flex>
          <ListRoom data={rooms} />
        </Col>
      </Row>
    </>
  )
}

export default FacilityDetailScreen
