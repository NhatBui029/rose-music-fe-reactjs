import { Col, Image, List, Row } from 'antd'
import {
  Instrument,
  ResponseGetListApi,
  StatusInstrumentEnum,
} from '../../../types/facility.type'
import { generatePath, Link, useParams } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/route-paths.constant'

const ListInstrument = ({
  data: instruments,
}: {
  data?: ResponseGetListApi<Instrument>
}) => {
  const { facilityId } = useParams()

  return (
    <div style={{ height: '300px', overflowY: 'scroll' }}>
      <List
        itemLayout="vertical"
        size="small"
        dataSource={instruments?.data}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            extra={
              <Image
                // width={272}
                height={100}
                alt="logo"
                src={item.imageUrl}
              />
            }
          >
            <List.Item.Meta
              title={
                <Link
                  to={generatePath(ROUTE_PATHS.INSTRUMENT_EDIT, {
                    facilityId: facilityId,
                    instrumentId: item.id,
                  })}
                >
                  {item.name}
                </Link>
              }
              description={
                <Row gutter={[16, 16]}>
                  <Col span={12}>Loại: {item.type}</Col>
                  <Col span={12}>
                    Tình trạng:{' '}
                    {
                      StatusInstrumentEnum[
                        item.status as unknown as keyof typeof StatusInstrumentEnum
                      ]
                    }{' '}
                  </Col>
                  <Col span={12}>Giá: {item.price} VNĐ</Col>
                  <Col span={12}>Kho: {item.countInStock}</Col>
                </Row>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default ListInstrument
