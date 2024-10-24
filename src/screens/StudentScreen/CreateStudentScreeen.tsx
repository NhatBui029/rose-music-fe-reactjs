import { Button, Form, FormProps, message, Modal, Steps, theme } from 'antd'

import apiCloudinaryInstance from '@api/apiCloudinaryInstance'
import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import {
  useCreateStudent,
  useCreateStudentTimeAvailable,
} from '@api/api-hooks/student'
import FormCreateEditStudent from './components/FormCreateEditStudent'
import { ComponentChildProps } from 'src/types/common.type'
import { useState } from 'react'
import FormCreateEditTimeAvailable from './components/FormCreateEditTimeAvailable'

const CreateStudentScreeen = ({ onClose, openModal }: ComponentChildProps) => {
  const [studentId, setStudentId] = useState<number>(1)
  const { mutateAsync: createStudentTimeAvailable } =
    useCreateStudentTimeAvailable()
  const { mutateAsync: createStudent } = useCreateStudent()
  const [step, setStep] = useState(0)
  const { token } = theme.useToken()
  const [formCreateStudent] = Form.useForm()
  const [formCreateStudentAvailable] = Form.useForm()
  const next = () => {
    setStep(step + 1)
  }

  const handleSubmitCreateStudent = async () => {
    await formCreateStudent.validateFields()
    formCreateStudent.submit()
    next()
  }

  const handleSubmitCreateTimeAvailable = () => {
    formCreateStudentAvailable.submit()
  }
  const onFinishCreateStudent: FormProps['onFinish'] = async (values) => {
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

        const newStudent = await createStudent({
          ...data,
          imageUrl,
        })

        setStudentId(newStudent.id)

        message.success(`Đã thêm thành công học viên ${data.name}`)
      } else {
        message.error('Chưa chọn ảnh')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm học viên mới')
    }
  }

  const onFinishCreateStudentAvailable: FormProps['onFinish'] = async (
    values,
  ) => {
    try {
      const studentTimeAvailables = values.studentTimeAvailables
        .map((value: any) => {
          if (value.isDelete !== true)
            return {
              studentId,
              startTime: value.time[0],
              endTime: value.time[1],
              dayOfWeek: value.dayOfWeek,
            }
        })
        .filter(Boolean)

      await createStudentTimeAvailable({ studentTimeAvailables })
      onClose()
      formCreateStudent.resetFields()
      formCreateStudentAvailable.resetFields()
      setStep(0)
      message.success(`Đã thêm thành công thời gian cho học viên `)
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm thời gian học')
    }
  }

  const steps = [
    {
      title: 'Thông tin',
      content: (
        <FormCreateEditStudent
          form={formCreateStudent}
          onFinish={onFinishCreateStudent}
        />
      ),
      footer: (
        <>
          <Button type="primary" onClick={handleSubmitCreateStudent}>
            Tiếp tục
          </Button>
        </>
      ),
    },
    {
      title: 'Thời gian học',
      content: (
        <FormCreateEditTimeAvailable
          onFinish={onFinishCreateStudentAvailable}
          form={formCreateStudentAvailable}
        />
      ),
      footer: (
        <>
          <Button type="primary" onClick={handleSubmitCreateTimeAvailable}>
            Lưu
          </Button>
        </>
      ),
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
    <>
      <Modal
        title="Thêm học viên mới"
        open={openModal}
        footer={false}
        onCancel={onClose}
      >
        <Steps current={step} items={items} />
        <div style={contentStyle}>{steps[step].content}</div>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'end' }}>
          {steps[step].footer}
        </div>
      </Modal>
    </>
  )
}

export default CreateStudentScreeen
