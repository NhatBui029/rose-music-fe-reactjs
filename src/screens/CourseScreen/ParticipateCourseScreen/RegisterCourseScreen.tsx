import { Button, Form, FormProps, message, Modal, Steps, theme } from 'antd'
import { ComponentChildProps } from 'src/types/common.type'
import { useState } from 'react'
import FormCreateEditStudentCourse from '../components/FormCreateEditStudentCourse'

const RegisterCourseScreen = ({ onClose, openModal }: ComponentChildProps) => {
  const { token } = theme.useToken()
  const [step, setStep] = useState(0)
  const [formRegister] = Form.useForm()

  const next = () => {
    setStep(step + 1)
  }

  const prev = () => {
    setStep(step - 1)
  }

  const handleSubmitResgiter = async () => {
    await formRegister.validateFields()
    formRegister.submit()
    next()
  }

  const steps = [
    {
      title: 'Đăng kí',
      content: <FormCreateEditStudentCourse form={formRegister} />,
      footer: (
        <>
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
          <Button type="primary" onClick={handleSubmitResgiter}>
            Next
          </Button>
        </>
      ),
    },
    {
      title: 'Xác nhận',
      content: 'Second-content',
      footer: (
        <>
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
          <Button type="primary" onClick={handleSubmitResgiter}>
            Next
          </Button>
        </>
      ),
    },
    {
      title: 'Hoá đơn',
      content: 'Last-content',
    },
  ]

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
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
      <Steps current={step} items={items} />
      <div style={contentStyle}>{steps[step].content}</div>
      <div style={{ marginTop: 24 }}>{steps[step].footer}</div>
    </Modal>
  )
}

export default RegisterCourseScreen
