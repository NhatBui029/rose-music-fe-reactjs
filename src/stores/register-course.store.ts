import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type RegisterCourseData = {
  students: number[]
  courses: number[]
  quantity: number
  voucherId: number | undefined
}

type RegisterCourseState = {
  data: RegisterCourseData | null
  setRegisterCourseData: (data: RegisterCourseData) => void
}

const useRegisterCourseStore = create<RegisterCourseState>()(
  devtools(
    persist(
      (set) => ({
        data: null,
        setRegisterCourseData: (data: RegisterCourseData) =>
          set({ data }, false, 'setRegisterCourseData'),
      }),
      {
        name: 'register-course-store',
        partialize: (state) => state.data,
      },
    ),
  ),
)

export default useRegisterCourseStore
