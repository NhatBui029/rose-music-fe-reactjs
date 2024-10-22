import { Descriptions, Typography } from 'antd'
import useRegisterCourseStore from '@stores/register-course.store'
import { useGetStudents } from '@api/api-hooks/student'
import { useGetCourses } from '@api/api-hooks/course'
import { useMemo } from 'react'
import { formatNumberToCurrency } from 'src/utils/common.util'
import { useGetVoucherDetail } from '@api/api-hooks/voucher'
import { DiscountUnitEnum, Voucher } from 'src/types/invoice.type'
import { Student } from 'src/types/student.type'
import { Course } from 'src/types/course.type'

const useCalculateAmount = (
  coursesData: Course[] | undefined,
  studentsLength: number = 1,
  quantity: number = 1,
  voucherData: Voucher | undefined,
) => {
  return useMemo(() => {
    if (!coursesData) {
      return { totalAmount: 0, discount: 0 }
    }

    const total = coursesData.reduce(
      (sum: number, course: Course) =>
        sum + course.price * studentsLength * quantity,
      0,
    )

    let discount = 0
    if (voucherData) {
      console.log('🚀 ~ returnuseMemo ~ voucherData:', voucherData)
      const { discount: voucherDiscount, discountUnit } = voucherData
      discount =
        discountUnit === ('PERCENT' as DiscountUnitEnum)
          ? Math.round((total * voucherDiscount) / 100)
          : discountUnit === ('VNĐ' as DiscountUnitEnum)
            ? total - voucherDiscount
            : 0
    }

    return { totalAmount: total, discount }
  }, [coursesData, studentsLength, quantity, voucherData])
}

const useFormattedData = (
  studentsData: Student[] | undefined,
  coursesData: Course[] | undefined,
) => {
  return useMemo(() => {
    const students = studentsData?.map((student: Student) => student.name) || []
    const courses = coursesData?.map((course: Course) => course.name) || []

    return { students, courses }
  }, [studentsData, coursesData])
}

const ConfirmRegisterCourseScreen = () => {
  const { data } = useRegisterCourseStore()

  const { data: studentsData } = useGetStudents({
    ids: data?.students ?? [],
  })
  const { data: coursesData } = useGetCourses({
    ids: data?.courses ?? [],
  })
  const { data: voucherData } = useGetVoucherDetail(
    data?.voucherId || 1,
    !!data?.voucherId,
  )

  const { totalAmount, discount } = useCalculateAmount(
    coursesData?.data,
    data?.students?.length,
    data?.quantity,
    data?.voucherId ? voucherData : undefined,
  )

  const { students, courses } = useFormattedData(
    studentsData?.data,
    coursesData?.data,
  )

  return (
    <>
      <Typography.Title level={4}>Xác nhận đăng ký</Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Học viên">
          {students.join(', ')}
        </Descriptions.Item>
        <Descriptions.Item label="Khoá học">
          {courses.join(', ')}
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng">{data?.quantity}</Descriptions.Item>
        <Descriptions.Item label="Tổng tiền">
          {formatNumberToCurrency(totalAmount)} VNĐ
        </Descriptions.Item>
        <Descriptions.Item label="Ưu đãi">
          {formatNumberToCurrency(discount)} VNĐ
        </Descriptions.Item>
        <Descriptions.Item label="Còn lại">
          {formatNumberToCurrency(totalAmount - discount)} VNĐ
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}

export default ConfirmRegisterCourseScreen
