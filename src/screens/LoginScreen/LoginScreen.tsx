import { Button, Form, FormProps, Input, notification } from 'antd'
import { LoginFormData, Token, UserData } from '../../types/auth.type'
import './style.css'
import useAppStore from '../../stores/app.store'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/route-paths.constant'

const DUMMY_CREDENTIALS = { username: 'dummy_id', password: '12345' }

const LoginScreen = () => {
  const { setCurrentUser, setVerifyingToken } = useAppStore()
  const navigate = useNavigate()
  const onFinish: FormProps<LoginFormData>['onFinish'] = (values) => {
    console.log(values)

    notification.success({
      message: 'Đăng nhập thành công',
      placement: 'bottomRight',
      duration: 2,
    })

    setCurrentUser({
      userId: 1,
      userName: 'dummy user name',
    } as UserData)

    setVerifyingToken({
      accessToken: 'a dummy token',
      refreshToken: 'a dummy refresh token',
    } as Token)

    navigate(ROUTE_PATHS.HOME)
  }
  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="login-form"
        initialValues={DUMMY_CREDENTIALS}
      >
        <Form.Item<LoginFormData>
          label={'Tên đăng nhập'}
          name="username"
          // rules={[validationRules]}
        >
          <Input />
        </Form.Item>

        <Form.Item<LoginFormData>
          label={'Mật khẩu'}
          name="password"
          // rules={[validationRules]}
        >
          <Input.Password />
        </Form.Item>

        <div className="text-center">
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </div>
      </Form>
    </>
  )
}

export default LoginScreen