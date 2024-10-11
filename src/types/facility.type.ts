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

export type CreateFacilityFormProps = Omit<Facility, 'id' | 'imageUrl'> & {
  upload: File
}

export type CreateRoomFormProps = Omit<Room, 'id' | 'imageUrl'> & {
  upload: File
}

export type CreateInstrumentFormProps = Omit<Instrument, 'id' | 'imageUrl'> & {
  upload: File
}

export type FacilityForm = Omit<Facility, 'id'>

export type RoomForm = Omit<Room, 'id'>
export type InstrumentForm = Omit<Instrument, 'id'>

export type FacilitysResponse = {
  data: Facility[]
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
