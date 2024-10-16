export type Facility = {
  id: number
  name: string
  color: string
  address: string
  imageUrl: string
}

export type Room = {
  id: number
  name: string
  note: string
  imageUrl: string
  roomInstruments?: RoomInstrument[]
  facilityId?: number
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
  facilityId?: number
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
