import { ReactNode } from 'react'
import useAppStore from '../stores/app.store'
import { Navigate } from 'react-router-dom'
import { ROUTE_PATHS } from './route-paths.constant'

type Props = { children: ReactNode }
const ProtectedRoute = ({ children }: Props) => {
  const currentUser = useAppStore((state) => state.currentUser)

  if (!currentUser) {
    return <Navigate to={ROUTE_PATHS.LOGIN} />
  }

  return children
}

export default ProtectedRoute
