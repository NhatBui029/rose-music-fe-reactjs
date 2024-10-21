import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

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
  devtools((set) => ({
    data: null,
    setRegisterCourseData: (data: RegisterCourseData) =>
      set({ data }, false, 'setRegisterCourseData'),
  })),
)

export default useRegisterCourseStore
