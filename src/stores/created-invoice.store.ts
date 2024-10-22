import { ResponseGetDetail } from 'src/types/common.type'
import { Invoice } from 'src/types/invoice.type'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type RegisterCourseState = {
  invoice: ResponseGetDetail<Invoice> | null
  setCreatedInvoiceStore: (invoice: ResponseGetDetail<Invoice>) => void
}

const useCreatedInvoiceStore = create<RegisterCourseState>()(
  devtools((set) => ({
    invoice: null,
    setCreatedInvoiceStore: (invoice: ResponseGetDetail<Invoice>) =>
      set({ invoice }, false, 'setCreatedInvoiceStore'),
  })),
)

export default useCreatedInvoiceStore
