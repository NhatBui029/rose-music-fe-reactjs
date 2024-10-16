import { FormProps, message, Modal } from 'antd'

import apiCloudinaryInstance from '@api/apiCloudinaryInstance'
import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import FormCreateEditTeacher from './components/FormCreateEditTeacher'
import { ComponentChildProps } from 'src/types/common.type'
import { useCreateTeacher } from '@api/api-hooks/teacher'

const CreateTeacherScreeen = ({ onClose, openModal }: ComponentChildProps) => {
  const { mutateAsync: createTeacher } = useCreateTeacher()

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
            folder: 'teacher',
            eager: 'c_crop,h_200,w_260',
          },
        )
        const formData = new FormData()
        formData.append('file', upload[0].originFileObj)

        const responseUploadImage: Record<string, string> =
          await apiCloudinaryInstance.post(presignedUrl, formData)

        imageUrl = responseUploadImage.secure_url

        await createTeacher({
          ...data,
          imageUrl,
        })

        onClose()
        message.success(`Đã thêm thành công giảng viên ${data.name}`)
      } else {
        message.error('Chưa chọn ảnh')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm giảng viên mới')
    }
  }
  return (
    <Modal
      title="Thêm giảng viên mới"
      open={openModal}
      footer={false}
      onCancel={onClose}
    >
      <FormCreateEditTeacher onFinish={onFinish} />
    </Modal>
  )
}

export default CreateTeacherScreeen
