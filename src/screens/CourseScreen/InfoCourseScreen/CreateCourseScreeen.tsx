import { FormProps, message, Modal } from 'antd'
import FormCreateEditCourse from '../components/FormCreateEditCourse'
import { ComponentChildProps } from 'src/types/common.type'
import { useCreateCourse } from '@api/api-hooks/course'

const CreateCourseScreeen = ({ onClose, openModal }: ComponentChildProps) => {
  const { mutateAsync: createCourse } = useCreateCourse()

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      await createCourse({
        ...values,
      })

      onClose()
      message.success(`Đã thêm thành công khóa học ${values.name}`)
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm khóa học mới')
    }
  }
  return (
    <Modal
      title="Thêm khóa học mới"
      open={openModal}
      footer={false}
      onCancel={onClose}
    >
      <FormCreateEditCourse onFinish={onFinish} />
    </Modal>
  )
}

export default CreateCourseScreeen
