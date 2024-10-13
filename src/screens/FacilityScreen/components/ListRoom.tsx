import { Drawer, Image, List, Space } from 'antd'
import React, { useState } from 'react'
import { BiMessageRounded } from 'react-icons/bi'
import { GrStarOutline } from 'react-icons/gr'
import { LiaKeySolid } from 'react-icons/lia'
import { ResponseGetListApi, Room } from '../../../types/facility.type'
import { generatePath, Link, useParams } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/route-paths.constant'

export const IconText = ({ icon, text }: { icon: React.FC; text?: string }) => (
  <Space align="center">
    {React.createElement(icon)}
    {text}
  </Space>
)

const ListRoom = ({ data: rooms }: { data?: ResponseGetListApi<Room> }) => {
  const { facilityId } = useParams()

  const [openDrawerEditRoom, setOpenDrawerEditRoom] = useState(false)

  const showDrawerEditRoom = () => {
    setOpenDrawerEditRoom(true)
  }

  const onCloseEditRoom = () => {
    setOpenDrawerEditRoom(false)
    // refetchGetRooms()
  }
  return (
    <>
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 4,
        }}
        dataSource={rooms?.data}
        renderItem={(item) => (
          <List.Item
            key={item.id}
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
                width={250}
                //   height={150}
                alt="logo"
                src={item.imageUrl}
              />
            }
          >
            <List.Item.Meta
              title={
                <Link
                  to={generatePath(ROUTE_PATHS.ROOM_EDIT, {
                    facilityId: facilityId,
                    roomId: item.id,
                  })}
                >
                  {item.name}
                </Link>
              }
              description={item.note}
            />
            {/* {item.content} */} Danh sach dung cu
          </List.Item>
        )}
      />
    </>
  )
}

export default ListRoom
