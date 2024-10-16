import dayjs from 'dayjs'
import { SexEnum } from 'src/types/common.type'

export const E2Vsex = (status: string) => {
  return SexEnum[status as unknown as keyof typeof SexEnum]
}

export const convertDate = (date: string) => {
  return dayjs(date).format('DD-MM-YYYY')
}
