import apiInstance from '../../../api/apiInstance'
import { API_ENPOINTS } from '../../../api/api.constants'
import { Drawer, FormProps, message } from 'antd'
import apiCloudinaryInstance from '../../../api/apiCloudinaryInstance'
import { useCreateInstrument } from '../../../api/api-hooks/instrument'
import FormCreateEditInstrument from '../components/FormCreateEditInstrument'
import { useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/route-paths.constant'

const CreateInstrumentScreen = () => {
  const { facilityId } = useParams()
  const navigate = useNavigate()

  const [openDrawerCreateInstrument, setOpenDrawerCreateInstrument] =
    useState(true)

  const onCloseDrawerCreateInstrument = () => {
    setOpenDrawerCreateInstrument(false)
    navigate(
      generatePath(ROUTE_PATHS.FACILITY_DETAIL, {
        facilityId,
      }),
    )
  }
  const { mutateAsync: createIntrument, isPending = false } =
    useCreateInstrument(Number(facilityId))

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      const presignedUrl: string = await apiInstance.post(
        API_ENPOINTS.URL_UPLOAD,
        {
          folder: 'instrument',
          eager: 'c_crop,h_200,w_260',
        },
      )

      const { name, price, countInStock, type, status, upload } = values

      if (upload && upload.length > 0) {
        if (upload[0].type !== 'image/jpeg' && upload[0].type !== 'image/png') {
          message.warning('Vui lòng chọn file ảnh')
          return
        }
        const formData = new FormData()
        formData.append('file', upload[0].originFileObj)

        const responseUploadImage: Record<string, string> =
          await apiCloudinaryInstance.post(presignedUrl, formData)

        await createIntrument({
          name,
          price,
          countInStock,
          type,
          status,
          imageUrl: responseUploadImage.secure_url,
        })

        onCloseDrawerCreateInstrument()

        message.success(`Đã tạo thành công dụng cụ ${name}`)
      } else {
        message.error('Chưa chọn ảnh')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo dụng cụ mới')
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
      title="Thêm dụng cụ mới"
      onClose={onCloseDrawerCreateInstrument}
      open={openDrawerCreateInstrument}
      width={500}
    >
      <FormCreateEditInstrument
        onFinish={onFinish}
        normFile={normFile}
        isPending={isPending}
      />
    </Drawer>
  )
}

export default CreateInstrumentScreen
