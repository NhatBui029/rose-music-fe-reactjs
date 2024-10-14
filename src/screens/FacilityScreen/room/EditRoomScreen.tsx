import apiInstance from '../../../api/apiInstance'
import { API_ENPOINTS } from '../../../api/api.constants'
import { Drawer, FormProps, message } from 'antd'
import apiCloudinaryInstance from '../../../api/apiCloudinaryInstance'
import { useEditRoom, useGetRoomDetail } from '../../../api/api-hooks/room'
import FormCreateEditRoom from '../components/FormCreateEditRoom'
import { useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/route-paths.constant'

const EditRoomScreen = () => {
  const { facilityId, roomId } = useParams()
  const navigate = useNavigate()
  let imageUrl = import.meta.env.VITE_API_DEFAULT_IMAGE_URL

  const { data: room } = useGetRoomDetail(Number(facilityId), Number(roomId))

  const [openDrawerCreateRoom, setOpenDrawerCreateRoom] = useState(true)

  const onCloseCreateRoom = () => {
    setOpenDrawerCreateRoom(false)
    navigate(
      generatePath(ROUTE_PATHS.FACILITY_DETAIL, {
        facilityId,
      }),
    )
  }
  const { mutateAsync: editRoom, isPending = false } = useEditRoom(
    Number(facilityId),
    Number(roomId),
  )

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      const { name, note, upload, roomInstruments } = values

      if (upload && upload.length > 0) {
        if (upload[0].type !== 'image/jpeg' && upload[0].type !== 'image/png') {
          message.warning('Vui lòng chọn file ảnh')
          return
        }
        const presignedUrl: string = await apiInstance.post(
          API_ENPOINTS.URL_UPLOAD,
          {
            folder: 'room',
            eager: 'c_crop,h_200,w_260',
          },
        )
        const formData = new FormData()
        formData.append('file', upload[0].originFileObj)

        const responseUploadImage: Record<string, string> =
          await apiCloudinaryInstance.post(presignedUrl, formData)

        imageUrl = responseUploadImage.secure_url
      } else {
        imageUrl = room?.imageUrl || import.meta.env.VITE_API_DEFAULT_IMAGE_URL
      }

      await editRoom({
        name,
        note,
        imageUrl,
        facilityId: Number(facilityId),
        roomInstruments,
      })

      onCloseCreateRoom()

      message.success(`Đã sửa thành công phòng học ${name}`)
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo phòng học mới')
    }
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  return (
    <Drawer
      title={`Sửa phòng học ${room?.name}`}
      onClose={onCloseCreateRoom}
      open={openDrawerCreateRoom}
      width={600}
    >
      <FormCreateEditRoom
        onFinish={onFinish}
        normFile={normFile}
        isPending={isPending}
        data={room}
      />
    </Drawer>
  )
}

export default EditRoomScreen
