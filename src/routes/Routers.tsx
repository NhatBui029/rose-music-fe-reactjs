import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ROUTE_PATHS } from './route-paths.constant'
import AppLayout from '../layouts/AppLayout/AppLayout'
import ProtectedRoute from './ProtectedRoute'
import HomeScreen from '../screens/HomeScreen'
import { NotFoundScreen, SystemErrorScreen } from '../screens/ResultScreen'
import AuthLayout from '../layouts/AuthLayout'
import { LoginScreen } from '../screens/LoginScreen'
import { FacilityScreen } from '../screens/FacilityScreen'
import FacilityDetailScreen from '../screens/FacilityScreen/FacilityDetailScreen'
import CreateRoomScreen from '../screens/FacilityScreen/room/CreateRoomScreen'
import CreateInstrumentScreen from '../screens/FacilityScreen/instrument/CreateInstrumentScreen'
import EditRoomScreen from '../screens/FacilityScreen/room/EditRoomScreen'
import EditInstrumentScreen from '../screens/FacilityScreen/instrument/EditInstrumentScreen'
import StudentScreen from '../screens/StudentScreen/StudentScreen'

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
          path: ROUTE_PATHS.FACILITY,
          element: (
            <ProtectedRoute>
              <FacilityScreen />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTE_PATHS.STUDENT,
          element: (
            <ProtectedRoute>
              <StudentScreen />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTE_PATHS.FACILITY_DETAIL,
          element: (
            <ProtectedRoute>
              <FacilityDetailScreen />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTE_PATHS.ROOM_CREATE,
          element: (
            <ProtectedRoute>
              <CreateRoomScreen />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTE_PATHS.ROOM_EDIT,
          element: (
            <ProtectedRoute>
              <EditRoomScreen />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTE_PATHS.INSTRUMENT_CREATE,
          element: (
            <ProtectedRoute>
              <CreateInstrumentScreen />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTE_PATHS.INSTRUMENT_EDIT,
          element: (
            <ProtectedRoute>
              <EditInstrumentScreen />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTE_PATHS.SYSTEM_ERROR,
          element: (
            <ProtectedRoute>
              <SystemErrorScreen />
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
