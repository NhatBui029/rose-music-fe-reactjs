import { StudentLevelEnum } from 'src/types/course.type'
import { DiscountUnitEnum } from 'src/types/invoice.type'

export const E2Vlevel = (level: string) => {
  return StudentLevelEnum[level as unknown as keyof typeof StudentLevelEnum]
}

export const E2VvoucherDiscountUnit = (level: string) => {
  return DiscountUnitEnum[level as unknown as keyof typeof DiscountUnitEnum]
}
