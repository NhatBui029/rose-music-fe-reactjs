import { StudentLevelEnum } from 'src/types/course.type'

export const E2Vlevel = (level: string) => {
  return StudentLevelEnum[level as unknown as keyof typeof StudentLevelEnum]
}
