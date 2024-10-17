import { FormProps, message, Modal } from 'antd'
import apiCloudinaryInstance from '@api/apiCloudinaryInstance'
import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import FormCreateEditTeacher from './components/FormCreateEditTeacher'
import { ComponentChildProps } from 'src/types/common.type'
import { useEditTeacher, useGetTeacherDetail } from '@api/api-hooks/teacher'

const EditCourseScreeen = ({
  onClose,
  openModal,
  id,
}: ComponentChildProps & { id: number }) => {
  const { mutateAsync: editTeacher } = useEditTeacher(id)
  const { data: teacher } = useGetTeacherDetail(id)

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
      } else {
        imageUrl = teacher?.imageUrl
      }
      await editTeacher({
        ...data,
        imageUrl,
      })

      onClose()
      message.success(`Đã sửa thông tin giảng viên ${data.name} thành công`)
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm giảng viên mới')
    }
  }
  return (
    <Modal
      title="Thay đổi thông tin học viên"
      open={openModal}
      footer={false}
      onCancel={onClose}
    >
      <FormCreateEditTeacher onFinish={onFinish} data={teacher} />
    </Modal>
  )
}

export default EditCourseScreeen
