import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ROUTE_PATHS } from './route-paths.constant'
import AppLayout from '../layouts/AppLayout'
import ProtectedRoute from './ProtectedRoute'
import HomeScreen from '../screens/HomeScreen'
import { NotFoundScreen, SystemErrorScreen } from '../screens/ResultScreen'
import AuthLayout from '../layouts/AuthLayout'
import { LoginScreen } from '../screens/LoginScreen'

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: ROUTE_PATHS.HOME,
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          ),
        },
        {
          path: '*',
          element: (
            <ProtectedRoute>
              <NotFoundScreen />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: ROUTE_PATHS.LOGIN,
      element: (
        <AuthLayout>
          <LoginScreen />
        </AuthLayout>
      ),
      handle: {
        title: 'Đăng nhập',
      },
    },
    {
      path: ROUTE_PATHS.SYSTEM_ERROR,
      element: <SystemErrorScreen />,
      handle: {
        title: 'Lỗi hệ thống',
      },
    },
    // {
    //   path: ROUTE_PATHS.LOGOUT,
    //   element: <LogoutScreen />,
    //   handle: {
    //     title: 'Logout',
    //   },
    // },
  ])

  return <RouterProvider router={router} />
}

export default Routers
