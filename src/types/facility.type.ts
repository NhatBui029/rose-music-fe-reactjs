export type Facility = {
  id: number
  name: string
  address: string
  imageUrl: string
}

export type CreateFacility = Omit<Facility, 'id' | 'imageUrl'> & {
  upload: File
}

export type FacilityForm = Omit<Facility, 'id'>
