import { Button, FormProps, message, Modal, Steps, theme } from 'antd'
import FormCreateEditCourse from '../components/FormCreateEditCourse'
import { ComponentChildProps } from 'src/types/common.type'
import { useCreateCourse } from '@api/api-hooks/course'
import { useState } from 'react'
import FormCreateEditStudentCourse from '../components/FormCreateEditStudentCourse'

const CreateStudentCourseScreen = ({
  onClose,
  openModal,
}: ComponentChildProps) => {
  const { mutateAsync: createCourse } = useCreateCourse()

  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      console.log("🚀 ~ constonFinish:FormProps['onFinish']= ~ values:", values)
      // await createCourse({
      //   ...values,
      // })

      onClose()
      message.success(`Đã thêm thành công khóa học ${values.name}`)
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm khóa học mới')
    }
  }

  const steps = [
    {
      title: 'Đăng kí',
      content: <FormCreateEditStudentCourse onFinish={onFinish} />,
    },
    {
      title: 'Xác nhận',
      content: 'Second-content',
    },
    {
      title: 'Hoá đơn',
      content: 'Last-content',
    },
  ]

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    // textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: 8,
  }

  return (
    <Modal
      title="Đăng kí khoá học"
      open={openModal}
      footer={false}
      onCancel={onClose}
    >
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default CreateStudentCourseScreen
