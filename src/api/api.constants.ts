export const API_ENPOINTS = {
  URL_UPLOAD: '/cloudinary/url-upload',
  FACILITY: '/facility',
  FACILITY_DETAIL: (facilityId: number) => `/facility/${facilityId}`,
  ROOM: (facilityId: number) => `/facility/${facilityId}/rooms`,
  ROOM_DETAIL: (facilityId: number, roomId: number) =>
    `/facility/${facilityId}/rooms/${roomId}`,
  ROOM_EDIT: (facilityId: number, roomId: number) =>
    `/facility/${facilityId}/rooms/${roomId}`,
  INSTRUMENT: (facilityId: number) => `/facility/${facilityId}/instruments`,
  INSTRUMENT_WAREHOUSE: (facilityId: number) =>
    `/facility/${facilityId}/instruments/warehouse`,
  INSTRUMENT_DETAIL: (facilityId: number, instrumentId: number) =>
    `/facility/${facilityId}/instruments/${instrumentId}`,
  INSTRUMENT_EDIT: (facilityId: number, intrumentId: number) =>
    `/facility/${facilityId}/instruments/${intrumentId}`,
}
