import apiInstance from '../../../api/apiInstance'
import { API_ENPOINTS } from '../../../api/api.constants'
import { Drawer, FormProps, message } from 'antd'
import apiCloudinaryInstance from '../../../api/apiCloudinaryInstance'
import {
  useEditIntrument,
  useGetInstrumentDetail,
} from '../../../api/api-hooks/instrument'
import FormCreateEditInstrument from '../components/FormCreateEditInstrument'
import { useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/route-paths.constant'

const EditInstrumentScreen = () => {
  const { facilityId, instrumentId } = useParams()
  const navigate = useNavigate()
  let imageUrl: string

  const { data: instrument } = useGetInstrumentDetail(
    Number(facilityId),
    Number(instrumentId),
  )
  console.log('🚀 ~ EditInstrumentScreen ~ data:', instrument)

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
  const { mutateAsync: editIntrument, isPending = false } = useEditIntrument(
    Number(facilityId),
    Number(instrumentId),
  )

  const onFinish: FormProps['onFinish'] = async (values) => {
    const { name, price, countInStock, type, status, upload } = values

    try {
      if (upload && upload.length > 0) {
        if (upload[0].type !== 'image/jpeg' && upload[0].type !== 'image/png') {
          message.warning('Vui lòng chọn file ảnh')
          return
        }
        const presignedUrl: string = await apiInstance.post(
          API_ENPOINTS.URL_UPLOAD,
          {
            folder: 'instrument',
            eager: 'c_crop,h_200,w_260',
          },
        )
        const formData = new FormData()
        formData.append('file', upload[0].originFileObj)

        const responseUploadImage: Record<string, string> =
          await apiCloudinaryInstance.post(presignedUrl, formData)

        imageUrl = responseUploadImage.secure_url
      } else {
        imageUrl =
          instrument?.imageUrl || import.meta.env.VITE_API_DEFAULT_IMAGE_URL
      }

      await editIntrument({
        name,
        price: Number(price),
        countInStock: Number(countInStock),
        type,
        status,
        imageUrl,
        facilityId: Number(facilityId),
      })

      onCloseDrawerCreateInstrument()
      message.success(`Đã sửa thành công dụng cụ ${name}`)
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
      title="Sửa dụng cụ"
      onClose={onCloseDrawerCreateInstrument}
      open={openDrawerCreateInstrument}
      width={500}
    >
      <FormCreateEditInstrument
        onFinish={onFinish}
        normFile={normFile}
        isPending={isPending}
        data={instrument}
      />
    </Drawer>
  )
}

export default EditInstrumentScreen
