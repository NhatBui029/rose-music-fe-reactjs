import { FormProps, message, Modal } from 'antd'

import apiCloudinaryInstance from '@api/apiCloudinaryInstance'
import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import { useCreateStudent } from '@api/api-hooks/student'
import FormCreateEditStudent from './components/FormCreateEditStudent'
import { ComponentChildProps } from 'src/types/common.type'
import { useState } from 'react'
import CreateStudentTimeAvailableScreen from './CreateStudentTimeAvailableScreen'

const CreateStudentScreeen = ({ onClose, openModal }: ComponentChildProps) => {
  const { mutateAsync: createStudent } = useCreateStudent()
  // const [isTimeAvailableCreateModalOpen, setIsTimeAvailableCreateModalOpen] =
  //   useState(false)

  // const onOpenTimeAvailableCreateModel = () => {
  //   setIsTimeAvailableCreateModalOpen(true)
  // }

  // const onCloseTimeAvailableCreateModel = () => {
  //   setIsTimeAvailableCreateModalOpen(false)
  // }

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      let imageUrl = import.meta.env.VITE_API_DEFAULT_IMAGE_URL
      const { upload, ...data } = values

      if (upload && upload.length > 0) {
        if (upload[0].type !== 'image/jpeg' && upload[0].type !== 'image/png') {
          message.warning('Vui lòng chọn file ảnh')
          return
        }
        const presignedUrl: string = await apiInstance.post(
          API_ENPOINTS.URL_UPLOAD,
          {
            folder: 'student',
            eager: 'c_crop,h_200,w_260',
          },
        )
        const formData = new FormData()
        formData.append('file', upload[0].originFileObj)

        const responseUploadImage: Record<string, string> =
          await apiCloudinaryInstance.post(presignedUrl, formData)

        imageUrl = responseUploadImage.secure_url

        await createStudent({
          ...data,
          imageUrl,
        })

        onClose()
        message.success(`Đã thêm thành công học viên ${data.name}`)
        // onOpenTimeAvailableCreateModel()
      } else {
        message.error('Chưa chọn ảnh')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm học viên mới')
    }
  }
  return (
    <>
      <Modal
        title="Thêm học viên mới"
        open={openModal}
        footer={false}
        onCancel={onClose}
      >
        <FormCreateEditStudent onFinish={onFinish} />
      </Modal>
    </>
  )
}

export default CreateStudentScreeen
