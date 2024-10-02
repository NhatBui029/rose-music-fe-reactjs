import { ReactNode } from 'react'
import './style.css'

type Props = { children: ReactNode }

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="auth-layout">
      {/* <div className="auth-layout-header">
        <img src="src/assets/images/jppost_logo.png" alt="Logo" />
      </div> */}
      {children}
    </div>
  )
}

export default AuthLayout
