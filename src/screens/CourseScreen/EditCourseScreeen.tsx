import { FormProps, message, Modal } from 'antd'
import FormCreateEditCourse from './components/FormCreateEditCourse'
import { ComponentChildProps } from 'src/types/common.type'
import { useEditCourse, useGetCourserDetail } from '@api/api-hooks/course'

const EditCourseScreeen = ({
  onClose,
  openModal,
  id,
}: ComponentChildProps & { id: number }) => {
  const { mutateAsync: editCourse } = useEditCourse(id)
  const { data: course } = useGetCourserDetail(id)

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      await editCourse({
        ...values,
      })

      onClose()
      message.success(`Đã sửa thông tin khóa học ${values.name} thành công`)
    } catch (error) {
      message.error('Có lỗi xảy ra khi sửa khóa học')
    }
  }
  return (
    <Modal
      title="Thay đổi thông tin khóa học"
      open={openModal}
      footer={false}
      onCancel={onClose}
    >
      <FormCreateEditCourse onFinish={onFinish} data={course} />
    </Modal>
  )
}

export default EditCourseScreeen
