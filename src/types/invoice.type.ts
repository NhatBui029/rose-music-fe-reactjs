import { PaginationParams } from './common.type'

export type Invoice = {
  id: number
  code: string
  amount: number
  issueDate: string
  dueDate: string
  status: InvoiceStatusEnum
  description?: string
}

export type Voucher = {
  id: number
  name: string
  description?: string
  discount: number
  discountUnit: DiscountUnitEnum
  facilityId: number
  isAvailable: boolean
}

export type VoucherStudentCourse = {
  id: number
  voucherId: number
  studentCourseId: number
  discounted: number
}

export type Payment = {
  id: number
  code: string
  method: PaymentMethodEnum
  amount: number
  paymentTime: string
  type: PaymentTypeEnum
  status: PaymentTypeEnum
  invoiceId: number
}

export enum InvoiceStatusEnum {
  PENDING = 'Đang chờ',
  PAID = 'Đã thanh toán',
  PARTIALLY_PAID = 'Thanh toán 1 phần',
  OVERDUE = 'Quá hạn',
  CANCELLED = 'Đã huỷ',
  REFUNDED = 'Đã hoàn tiền',
}

export enum DiscountUnitEnum {
  VNĐ = ' VNĐ',
  PERCENT = '%',
}

export enum PaymentMethodEnum {
  CASH = 'Tiền mặt',
  BANK = 'Chuyển khoản',
}

export enum PaymentStatusEnum {
  PENDING = 'Đang chờ',
  COMPLETED = 'Thành công',
}

export enum PaymentTypeEnum {
  TRANFER = 'Chuyển đi',
  RECEIVE = 'Nhận về',
}

export type VoucherSearchParams = PaginationParams & {
  facilityId?: number
  isAvailable?: boolean
}
