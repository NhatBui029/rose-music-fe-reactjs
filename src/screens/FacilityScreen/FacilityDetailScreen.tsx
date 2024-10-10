import { Col, Flex, Image, Row, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { useGetFacilityDetail } from '../../api/api-hooks/facility'

const { Text } = Typography
const FacilityDetailScreen = () => {
  const { id } = useParams()
  const { data: facility } = useGetFacilityDetail(Number(id))
  console.log('🚀 ~ FacilityDetailScreen ~ facility:', facility)
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
        <div>right</div>
      </Col>
    </Row>
  )
}

export default FacilityDetailScreen
