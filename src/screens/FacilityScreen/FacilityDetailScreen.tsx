import {
  Button,
  Col,
  Drawer,
  Flex,
  Image,
  List,
  Row,
  Space,
  Typography,
} from 'antd'
import { useParams } from 'react-router-dom'
import { useGetFacilityDetail } from '../../api/api-hooks/facility'
import React, { useState } from 'react'
import CreateRoomScreen from './CreateRoomScreen'
import { GrStarOutline } from 'react-icons/gr'
import { LiaKeySolid } from 'react-icons/lia'
import { BiMessageRounded } from 'react-icons/bi'
import CreateInstrumentScreen from './CreateInstrumentScreen'

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const data = Array.from({ length: 5 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `Rose music 1`,
  // avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description: 'Kiến An- Hải Phòng',
  content: (
    <Flex vertical gap={5}>
      <IconText icon={GrStarOutline} text="156" key="list-vertical-star-o" />
      <IconText icon={LiaKeySolid} text="156" key="list-vertical-like-o" />
      <IconText icon={BiMessageRounded} text="2" key="list-vertical-message" />
    </Flex>
  ),
}))

const { Text, Title } = Typography
const FacilityDetailScreen = () => {
  const { id } = useParams()
  const { data: facility } = useGetFacilityDetail(Number(id))
  const [openDrawerCreateRoom, setOpenDrawerCreateRoom] = useState(false)
  const [openDrawerCreateInstrument, setOpenDrawerCreateInstrument] =
    useState(false)

  const showDrawerCreateRoom = () => {
    setOpenDrawerCreateRoom(true)
  }

  const onCloseCreateRoom = () => {
    setOpenDrawerCreateRoom(false)
  }

  const showDrawerCreateInstrument = () => {
    setOpenDrawerCreateInstrument(true)
  }

  const onCloseCreateInstrument = () => {
    setOpenDrawerCreateInstrument(false)
  }

  return (
    <>
      <Row gutter={20}>
        <Col span={12}>
          <Flex vertical gap={20}>
            <Image src={facility?.imageUrl} />
            <Text>{facility?.name}</Text>
            <Text>{facility?.address}</Text>
            <Flex justify="space-between">
              <Title level={5}>Danh sách thiết bị</Title>
              <Button onClick={showDrawerCreateInstrument}>Thêm</Button>
            </Flex>
            <div style={{ height: '300px', overflowY: 'scroll' }}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta title={item.title} />
                  </List.Item>
                )}
              />
            </div>
          </Flex>
        </Col>
        <Col span={12}>
          <Flex justify="space-between">
            <Title level={3}>Danh sách phòng học</Title>
            <Button onClick={showDrawerCreateRoom}>Thêm</Button>
          </Flex>
          <List
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: (page) => {
                console.log(page)
              },
              pageSize: 3,
            }}
            dataSource={data}
            footer={
              <div>
                <b>ant design</b> footer part
              </div>
            }
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={GrStarOutline}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LiaKeySolid}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={BiMessageRounded}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  <Image
                    width={272}
                    alt="logo"
                    src="https://res.cloudinary.com/dsrg8wtvf/image/upload/v1728551767/facility/tyjt1ntjn3uzmqq2ndyj.jpg"
                  />
                }
              >
                <List.Item.Meta
                  // avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Drawer
        title="Tạo phòng học mới"
        onClose={onCloseCreateRoom}
        open={openDrawerCreateRoom}
        width={500}
      >
        <CreateRoomScreen id={Number(id)} onClose={onCloseCreateRoom} />
      </Drawer>
      <Drawer
        title="Thêm dụng cụ mới"
        onClose={onCloseCreateInstrument}
        open={openDrawerCreateInstrument}
        width={500}
      >
        <CreateInstrumentScreen
          id={Number(id)}
          onClose={onCloseCreateInstrument}
        />
      </Drawer>
    </>
  )
}

export default FacilityDetailScreen
