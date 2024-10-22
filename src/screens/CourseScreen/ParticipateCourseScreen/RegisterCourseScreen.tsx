import { Button, Form, Modal, Steps, theme } from 'antd'
import { ComponentChildProps } from 'src/types/common.type'
import { useState } from 'react'
import FormRegisterCourse from '../components/FormRegisterStudentCourse'
import ConfirmRegisterCourseScreen from '../components/ConfirmRegisterCourseScreen'
import InvoiceRegisterCourseScreen from '../components/InvoiceRegisterCourseScreen'
import useRegisterCourseStore from '@stores/register-course.store'
import { useCreateStudentCourse } from '@api/api-hooks/student-course'
import useCreatedInvoiceStore from '@stores/created-invoice.store'

const RegisterCourseScreen = ({ onClose, openModal }: ComponentChildProps) => {
  const { token } = theme.useToken()
  const [step, setStep] = useState(0)
  const [formRegister] = Form.useForm()
  const { data } = useRegisterCourseStore()
  const { setCreatedInvoiceStore } = useCreatedInvoiceStore()
  const { mutateAsync: registerCourse } = useCreateStudentCourse()

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

  const handleSubmitConfirm = async () => {
    const invoice = await registerCourse(data)
    console.log('🚀 ~ handleSubmitConfirm ~ invoice:', invoice)
    setCreatedInvoiceStore(invoice)
    next()
  }

  const steps = [
    {
      title: 'Đăng kí',
      content: <FormRegisterCourse form={formRegister} />,
      footer: (
        <>
          <Button type="primary" onClick={handleSubmitResgiter}>
            Tiếp tục
          </Button>
        </>
      ),
    },
    {
      title: 'Xác nhận',
      content: <ConfirmRegisterCourseScreen />,
      footer: (
        <>
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Quay lại
          </Button>
          <Button type="primary" onClick={handleSubmitConfirm}>
            Tạo hóa đơn
          </Button>
        </>
      ),
    },
    {
      title: 'Hoá đơn',
      content: <InvoiceRegisterCourseScreen />,
      footer: (
        <>
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Quay lại
          </Button>
          <Button type="primary" onClick={handleSubmitResgiter}>
            Tạo hóa đơn
          </Button>
        </>
      ),
    },
    {
      title: 'Thời gian học',
      content: 'Time available',
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
      width={700}
    >
      <Steps current={step} items={items} />
      <div style={contentStyle}>{steps[step].content}</div>
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'end' }}>
        {steps[step].footer}
      </div>
    </Modal>
  )
}

export default RegisterCourseScreen
