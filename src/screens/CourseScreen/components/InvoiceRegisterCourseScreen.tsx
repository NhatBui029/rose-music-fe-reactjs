import useCreatedInvoiceStore from '@stores/created-invoice.store'
import { Form, Input, Image, InputNumber, Flex, Typography } from 'antd'
const { Paragraph, Text } = Typography
const InvoiceRegisterCourseScreen = () => {
  const { invoice } = useCreatedInvoiceStore()
  console.log('🚀 ~ InvoiceRegisterCourseScreen ~ invoice:', invoice?.code)
  const invoiceCode = invoice?.code
  const amountDue = '1,000,000'
  const qrCodeUrl = 'https://via.placeholder.com/150'
  const bankDetails = {
    STK: '23842334',
    bankName: 'ABC Bank',
    accountHolder: 'John Doe',
    transferContent: 'Payment for Course INV123456',
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Form>
        <Form.Item label="Mã hóa đơn">
          <Input value={invoice?.code} readOnly />
        </Form.Item>

        <Form.Item label="Tổng số tiền">
          <InputNumber value={amountDue} readOnly addonAfter={'VNĐ'} />
        </Form.Item>

        <Form.Item>
          <Flex align="center" justify="space-between">
            <Flex vertical>
              <Flex gap={5}>
                <Text>STK: </Text>
                <Paragraph copyable>{bankDetails.STK}</Paragraph>
              </Flex>
              <Flex gap={5}>
                <Text>Ngân hàng: </Text>
                <Paragraph>{bankDetails.bankName}</Paragraph>
              </Flex>
              <Flex gap={5}>
                <Text>Tên người nhận: </Text>
                <Paragraph>{bankDetails.accountHolder}</Paragraph>
              </Flex>
              <Flex gap={5}>
                <Text>Nội dung: </Text>
                <Paragraph>{bankDetails.transferContent}</Paragraph>
              </Flex>
            </Flex>

            <Image width={150} src={qrCodeUrl} alt="QR Code" />
          </Flex>
        </Form.Item>
      </Form>
    </div>
  )
}

export default InvoiceRegisterCourseScreen
