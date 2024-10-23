import { FormProps, message, Modal } from 'antd'

import { ComponentChildProps } from 'src/types/common.type'
import FormCreateEditTimeAvailable from './components/FormCreateEditTimeAvailable'

const CreateStudentTimeAvailableScreen = ({
  onClose,
  openModal,
}: ComponentChildProps) => {
  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      onClose()
      message.success(`Đã thêm thành công học viên `)
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm học viên mới')
    }
  }
  return (
    <Modal
      title="Thời gian học"
      open={openModal}
      footer={false}
      onCancel={onClose}
    >
      <FormCreateEditTimeAvailable onFinish={onFinish} />
    </Modal>
  )
}

export default CreateStudentTimeAvailableScreen
