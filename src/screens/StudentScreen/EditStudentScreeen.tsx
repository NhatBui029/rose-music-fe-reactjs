import { Button, Form, FormProps, message, Modal, Steps, theme } from 'antd'
import apiCloudinaryInstance from '@api/apiCloudinaryInstance'
import { API_ENPOINTS } from '@api/api.constants'
import apiInstance from '@api/apiInstance'
import {
  useCreateStudentTimeAvailable,
  useEditStudent,
  useGetStudentDetail,
} from '@api/api-hooks/student'
import FormCreateEditStudent from './components/FormCreateEditStudent'
import { ComponentChildProps } from 'src/types/common.type'
import { useState } from 'react'
import FormCreateEditTimeAvailable from './components/FormCreateEditTimeAvailable'

const EditStudentScreeen = ({
  onClose,
  openModal,
  id,
}: ComponentChildProps & { id: number }) => {
  const { mutateAsync: editStudent } = useEditStudent(id)
  const { data: student } = useGetStudentDetail(id)
  const { mutateAsync: updateStudentTimeAvailable } =
    useCreateStudentTimeAvailable()
  const [step, setStep] = useState(0)
  const { token } = theme.useToken()
  const [formEditStudent] = Form.useForm()
  const [formEditStudentAvailable] = Form.useForm()
  const next = () => {
    setStep(step + 1)
  }
  const prev = () => {
    setStep(step - 1)
  }
  const handleSubmitEditStudent = async () => {
    await formEditStudent.validateFields()
    formEditStudent.submit()
    next()
  }

  const handleSubmitEditTimeAvailable = () => {
    formEditStudentAvailable.submit()
  }

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
      next()
      message.success(`Đã sửa thông tin học viên ${data.name} thành công`)
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm học viên mới')
    }
  }

  const onFinishCreateStudentAvailable: FormProps['onFinish'] = async (
    values,
  ) => {
    try {
      const studentTimeAvailables = values.studentTimeAvailables.map(
        (value: any) => {
          return {
            id: value.id,
            studentId: id,
            startTime: value.time[0],
            endTime: value.time[1],
            dayOfWeek: value.dayOfWeek,
            isDelete: value.isDelete,
          }
        },
      )

      await updateStudentTimeAvailable({ studentTimeAvailables })
      onClose()
      message.success(`Đã thay đổi thời gian học cho học viên `)
    } catch (error) {
      message.error('Có lỗi xảy ra khi thay đổi thời gian học')
    }
  }
  const steps = [
    {
      title: 'Thông tin',
      content: (
        <FormCreateEditStudent
          onFinish={onFinish}
          data={student}
          form={formEditStudent}
        />
      ),
      footer: (
        <>
          <Button style={{ margin: '0 8px' }} onClick={next}>
            Bỏ qua
          </Button>
          <Button type="primary" onClick={handleSubmitEditStudent}>
            Sửa
          </Button>
        </>
      ),
    },
    {
      title: 'Thời gian học',
      content: (
        <FormCreateEditTimeAvailable
          onFinish={onFinishCreateStudentAvailable}
          form={formEditStudentAvailable}
          data={student?.studentAvailables}
        />
      ),
      footer: (
        <>
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Quay lại
          </Button>
          <Button type="primary" onClick={handleSubmitEditTimeAvailable}>
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
    <Modal
      title="Thay đổi thông tin học viên"
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
  )
}

export default EditStudentScreeen
