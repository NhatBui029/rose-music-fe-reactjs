export type Facility = {
  id: number
  name: string
  address: string
  imageUrl: string
}

export type Room = {
  id: number
  name: string
  note: string
  imageUrl: string
  roomInstruments?: RoomInstrument[]
}

export type RoomInstrument = {
  instrumentId: number
  quantity: number
  id?: number
  roomId?: number
}

export type Instrument = {
  id: number
  name: string
  price: number
  countInStock: number
  imageUrl: string
  type: MusicalInstrumentEnum
  status: StatusInstrumentEnum
}

export type CreateEditFormItems<T> = Omit<T, 'id' | 'imageUrl'> & {
  upload?: File
}

export type BodyFormData<T> = Omit<T, 'id'> & {
  facilityId?: number
}

export type ResponseGetListApi<T> = {
  data: T[]
  meta?: {
    total: number
    page: number
    pageSize: number
  }
}

export type ResponseGetDetail<T> = T & {
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  facilityId: number
}

export enum MusicalInstrumentEnum {
  PIANO = 'PIANO',
  GUITAR = 'GUITAR',
  ORGAN = 'ORGAN',
}

export enum StatusInstrumentEnum {
  NEW = 'Mới',
  USING = 'Đang sử dụng',
  USED = 'Đã qua sử dụng',
}

export type DrawerProps = {
  onClose: () => void
}

export type CreateEditFormProps<T> = {
  onFinish: (values: any) => void
  normFile: (e: any) => void
  isPending: boolean
  data?: T
}
