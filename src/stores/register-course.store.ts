import { RegisterCourseDataCreate } from 'src/types/student-course'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type RegisterCourseState = {
  data: RegisterCourseDataCreate | null
  setRegisterCourseData: (data: RegisterCourseDataCreate) => void
}

const useRegisterCourseStore = create<RegisterCourseState>()(
  devtools((set) => ({
    data: null,
    setRegisterCourseData: (data: RegisterCourseDataCreate) =>
      set({ data }, false, 'setRegisterCourseData'),
  })),
)

export default useRegisterCourseStore
