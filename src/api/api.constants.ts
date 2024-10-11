export const API_ENPOINTS = {
  URL_UPLOAD: '/cloudinary/url-upload',
  FACILITY: '/facility',
  FACILITY_DETAIL: (id: number) => `/facility/${id}`,
  ROOM: (id: number) => `/facility/${id}/room`,
  INSTRUMENT: (id: number) => `/facility/${id}/instrument`,
}
