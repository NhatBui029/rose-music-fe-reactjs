import useCreatedInvoiceStore from '@stores/created-invoice.store'
import {
  Form,
  Input,
  InputNumber,
  Flex,
  Descriptions,
  Image,
  Typography,
} from 'antd'
import { formatNumberToCurrency } from 'src/utils/common.util'
import { VietQR } from 'vietqr'

const InvoiceRegisterCourseScreen = () => {
  const { invoice } = useCreatedInvoiceStore()
  const invoiceCode = invoice?.code
  const invoiceTotalAmount =
    (invoice?.totalAmount || 0) - (invoice?.discountAmount || 0)
  const bankDetails = {
    accountNumber: '6814022002',
    bank: 'Techcombank',
    accountName: 'BUI TUAN NHAT',
    memo: `${invoiceCode}`,
  }
  let vietQR = new VietQR({
    clientID: import.meta.env.VITE_VIET_QR_CLIENT_ID,
    apiKey: import.meta.env.VITE_VIET_QR_API_KEY,
  })

  const qrCodeUrl = vietQR.genQuickLink({
    ...bankDetails,
    bank: '970407',
    amount: invoice?.totalAmount || 0,
    template: 'compact2',
    media: '.jpg',
  })

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Form>
        <Form.Item label="Mã hóa đơn">
          <Input value={invoiceCode} readOnly />
        </Form.Item>

        <Form.Item label="Tổng số tiền">
          <InputNumber
            value={formatNumberToCurrency(invoiceTotalAmount)}
            readOnly
            addonAfter={'VNĐ'}
          />
        </Form.Item>

        <Form.Item>
          <Flex align="center" justify="space-between" gap={20}>
            <Descriptions column={1} style={{ width: '60%' }}>
              <Descriptions.Item label="STK">
                {bankDetails.accountNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Ngân hàng">
                {bankDetails.bank}
              </Descriptions.Item>
              <Descriptions.Item label="Tên người nhận">
                {bankDetails.accountName}
              </Descriptions.Item>
              <Descriptions.Item label="Nội dung">
                {bankDetails.memo}
              </Descriptions.Item>
              <Descriptions.Item>
                <Typography.Text
                  copyable={{ text: qrCodeUrl }}
                  type={'secondary'}
                >
                  Copy link hóa đơn
                </Typography.Text>
              </Descriptions.Item>
            </Descriptions>
            <Image width={200} src={qrCodeUrl || '-'} />
          </Flex>
        </Form.Item>
      </Form>
    </div>
  )
}

export default InvoiceRegisterCourseScreen
