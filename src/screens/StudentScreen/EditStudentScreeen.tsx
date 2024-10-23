import { Form, FormProps, message, Modal } from 'antd'
import apiCloudinaryInstance from '@api/apiCloudinaryInstance'
import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import { useEditStudent, useGetStudentDetail } from '@api/api-hooks/student'
import FormCreateEditStudent from './components/FormCreateEditStudent'
import { ComponentChildProps } from 'src/types/common.type'

const EditStudentScreeen = ({
  onClose,
  openModal,
  id,
}: ComponentChildProps & { id: number }) => {
  const { mutateAsync: editStudent } = useEditStudent(id)
  const { data: student } = useGetStudentDetail(id)
  const [form] = Form.useForm()

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
      } else {
        imageUrl = student?.imageUrl
      }
      await editStudent({
        ...data,
        imageUrl,
      })

      onClose()
      message.success(`Đã sửa thông tin học viên ${data.name} thành công`)
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm học viên mới')
    }
  }
  return (
    <Modal
      title="Thay đổi thông tin học viên"
      open={openModal}
      footer={false}
      onCancel={onClose}
    >
      <FormCreateEditStudent onFinish={onFinish} data={student} form={form} />
    </Modal>
  )
}

export default EditStudentScreeen
