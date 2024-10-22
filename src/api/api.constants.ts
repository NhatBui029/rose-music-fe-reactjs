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
  STUDENT: '/student',
  STUDENT_DETAIL: (studentId: number) => `/student/${studentId}`,
  TEACHER: '/teacher',
  TEACHER_DETAIL: (teacherId: number) => `/teacher/${teacherId}`,
  SUBJECT: '/subject',
  COURSE: '/course',
  COURSE_DETAIL: (courseId: number) => `/course/${courseId}`,
  VOUCHER: '/voucher',
  VOUCHER_DETAIL: (voucherId: number) => `/voucher/${voucherId}`,
  STUDENT_COURSE: `/student-course`,
  STUDENT_COURSE_DETAIL: (studentCourseId: number) =>
    `/student-course/${studentCourseId}`,
}
