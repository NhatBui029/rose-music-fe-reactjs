import { useEffect, useState } from 'react'
import apiInstance from '../../api/apiInstance'
import { API_ENPOINTS } from '../../api/api.constants'
import {
  Button,
  Form,
  FormProps,
  GetProp,
  Input,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'
import { CreateFacility } from '../../types/facility.type'
import { TiUploadOutline } from 'react-icons/ti'
import axios from 'axios'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const CreateFacilityScreen = () => {
  useEffect(() => {
    const getData = async () => {
      const data = await apiInstance.post(API_ENPOINTS.URL_UPLOAD, {
        folderName: 'facility',
      })
      console.log('🚀 ~ getData ~ data:', data)
    }

    getData()
  }, [])
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onFinish: FormProps<CreateFacility>['onFinish'] = async (values) => {
    const uploadRespone: {
      signature: string
      timestamp: string
      folderName: string
    } = await apiInstance.post(API_ENPOINTS.URL_UPLOAD, {
      folderName: 'facility',
    })
    const formData = new FormData()
    if (fileList.length > 0) {
      formData.append('file', fileList[0] as FileType)
    }
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dsrg8wtvf/image/upload?api_key=878165361166532&timestamp=${uploadRespone?.timestamp}&folder=${uploadRespone.folderName}&signature=${uploadRespone?.signature}`,
      formData,
    )
    console.log('hi', res)
  }

  const props: UploadProps = {
    onRemove: () => {
      setFileList([])
    },
    beforeUpload: (file) => {
      setFileList([file]) // Chỉ giữ lại file mới được chọn
      return false
    },
    fileList,
    maxCount: 1, // Giới hạn chỉ 1 file
  }
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<CreateFacility>
          label="Tên cơ sở"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<CreateFacility>
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<CreateFacility>
          name="file"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          // getValueFromEvent={normFile}
          // extra="theodorebui"
        >
          <Upload {...props}>
            <Button icon={<TiUploadOutline />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateFacilityScreen
