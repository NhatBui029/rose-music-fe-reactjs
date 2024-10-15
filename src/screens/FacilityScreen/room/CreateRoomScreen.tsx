import apiInstance from '../../../api/apiInstance'
import { API_ENPOINTS } from '../../../api/api.constants'
import { Drawer, FormProps, message } from 'antd'
import apiCloudinaryInstance from '../../../api/apiCloudinaryInstance'
import { useCreateRoom } from '../../../api/api-hooks/room'
import FormCreateEditRoom from '../components/FormCreateEditRoom'
import { useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/route-paths.constant'

const CreateRoomScreen = () => {
  const { facilityId } = useParams()
  const navigate = useNavigate()

  const [openDrawerCreateRoom, setOpenDrawerCreateRoom] = useState(true)

  const { mutateAsync: createRoom, isPending = false } = useCreateRoom(
    Number(facilityId),
  )

  const onCloseCreateRoom = () => {
    setOpenDrawerCreateRoom(false)
    navigate(
      generatePath(ROUTE_PATHS.FACILITY_DETAIL, {
        facilityId,
      }),
    )
  }

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      let imageUrl = import.meta.env.VITE_API_DEFAULT_IMAGE_URL
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
        await createRoom({
          name,
          note,
          imageUrl,
          roomInstruments,
        })

        onCloseCreateRoom()

        message.success(`Đã tạo thành công phòng học ${name}`)
      } else {
        message.error('Chưa chọn ảnh')
      }
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
      title="Tạo phòng học mới"
      onClose={onCloseCreateRoom}
      open={openDrawerCreateRoom}
      width={600}
    >
      <FormCreateEditRoom
        onFinish={onFinish}
        normFile={normFile}
        isPending={isPending}
      />
    </Drawer>
  )
}

export default CreateRoomScreen
